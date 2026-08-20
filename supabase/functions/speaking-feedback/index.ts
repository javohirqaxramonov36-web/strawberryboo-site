import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': 'https://javohirqaxramonov36-web.github.io',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: cors });
const systemPrompt = `You are Tayanch's IELTS Speaking practice coach. Evaluate only the supplied transcript and question. Return JSON with this exact shape: {overall:number, confidence:"low"|"medium"|"high", fluency:{band:number, notes:string[], next:string[]}, lexical:{band:number, notes:string[], next:string[]}, grammar:{band:number, notes:string[], next:string[]}, pronunciation:{band:number|null, notes:string[], next:string[]}, summary:string, retry:boolean}. Scores are practice estimates from 0 to 9 in 0.5 steps, never official IELTS scores. Pronunciation cannot be reliably scored from text alone: set pronunciation.band to null and clearly explain the limitation unless audio acoustic analysis was supplied (it is not in this MVP). If an answer is too short or fails the requested part, set retry=true and say what to do next. Give concrete, supportive Uzbek feedback.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  try {
    const token = req.headers.get('Authorization') || '';
    const anon = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: token } } });
    const { data: { user }, error: userError } = await anon.auth.getUser();
    if (userError || !user) return json({ error: 'Avval email orqali kiring.' }, 401);

    const body = await req.json();
    const day = Number(body.day);
    const part = String(body.part || 'full');
    const question = String(body.question || '').trim();
    const transcript = String(body.transcript || '').trim();
    const audioPath = body.audioPath ? String(body.audioPath) : null;
    const completed = Boolean(body.completed);
    if (!Number.isInteger(day) || day < 1 || day > 30 || !question || transcript.length < 12) {
      return json({ error: 'Kun, savol va kamida bitta mazmunli javob kerak.' }, 400);
    }
    if (audioPath && !audioPath.startsWith(`${user.id}/`)) return json({ error: 'Audio manzili noto‘g‘ri.' }, 403);

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicKey) return json({ error: 'AI baholash hozircha sozlanmagan.' }, 503);

    const { data: pendingAttempt, error: pendingError } = await admin.from('attempts').insert({
      user_id: user.id, product_type: 'speaking', module_type: 'speaking', qadam_cost: 1,
      status: 'analysis_pending', started_at: new Date().toISOString(), course_day: day,
      prompt_snapshot: { part, question }, transcript, audio_path: audioPath,
      model_metadata: { provider: 'anthropic', limitation: 'Transcript-only MVP; pronunciation is not acoustically scored.' },
    }).select('id').single();
    if (pendingError) throw pendingError;
    const { data: charged, error: chargeError } = await admin.rpc('consume_speaking_qadam', { p_attempt_id: pendingAttempt.id });
    if (chargeError) throw chargeError;
    if (!charged) {
      await admin.from('attempts').update({ status: 'cancelled' }).eq('id', pendingAttempt.id);
      return json({ error: 'AI feedback uchun kamida 1 Qadam kerak.' }, 402);
    }

    const started = Date.now();
    const ai = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-3-5-haiku-latest', max_tokens: 1200, system: systemPrompt, messages: [{ role: 'user', content: `Day ${day}; IELTS ${part}.\nQuestion: ${question}\nTranscript: ${transcript}` }] }),
    });
    if (!ai.ok) {
      await admin.rpc('refund_speaking_qadam', { p_attempt_id: pendingAttempt.id, p_reason: 'anthropic_error' });
      await admin.from('attempts').update({ status: 'refunded' }).eq('id', pendingAttempt.id);
      return json({ error: 'AI baholash vaqtincha ishlamadi. Qadamingiz qaytarildi.' }, 502);
    }
    const payload = await ai.json();
    const text = payload?.content?.[0]?.text || '';
    const clean = text.replace(/^```json\s*|\s*```$/g, '').trim();
    let feedback: Record<string, unknown>;
    try { feedback = JSON.parse(clean); } catch {
      await admin.rpc('refund_speaking_qadam', { p_attempt_id: pendingAttempt.id, p_reason: 'invalid_provider_payload' });
      await admin.from('attempts').update({ status: 'refunded' }).eq('id', pendingAttempt.id);
      return json({ error: 'AI javobi kutilgan formatda kelmadi. Qadamingiz qaytarildi.' }, 502);
    }

    const { data: attempt, error: attemptError } = await admin.from('attempts').update({
      status: 'completed', submitted_at: new Date().toISOString(), completed_at: new Date().toISOString(),
      score: { overall: feedback.overall, fluency: feedback.fluency, lexical: feedback.lexical, grammar: feedback.grammar, pronunciation: feedback.pronunciation },
      result_summary: feedback, model_metadata: { provider: 'anthropic', model: 'claude-3-5-haiku-latest', limitation: 'Transcript-only MVP; pronunciation is not acoustically scored.' },
    }).eq('id', pendingAttempt.id).select('id').single();
    if (attemptError) throw attemptError;
    await admin.from('ai_jobs').insert({ attempt_id: attempt.id, stage: 'feedback', provider: 'anthropic', model: 'claude-3-5-haiku-latest', status: 'succeeded', idempotency_key: crypto.randomUUID(), latency_ms: Date.now() - started, metadata: { course_day: day, part } });
    if (completed) await admin.from('speaking_progress').upsert({ user_id: user.id, course_day: day, pronunciation_done: true, shadowing_done: true, speaking_done: true, completed_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: 'user_id,course_day' });
    return json({ attemptId: attempt.id, feedback });
  } catch (error) {
    console.error(error);
    return json({ error: 'Kutilmagan xatolik yuz berdi.' }, 500);
  }
});
