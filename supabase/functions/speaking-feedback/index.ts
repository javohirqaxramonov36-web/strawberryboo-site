import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': 'https://javohirqaxramonov36-web.github.io',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: cors });
const allowedParts = new Set(['part1', 'part2', 'part3', 'full']);
const allowedSections = new Set(['pronunciation', 'shadowing', 'speaking']);
const systemPrompt = `You are Tayanch's IELTS Speaking practice coach. Evaluate only supplied transcript(s) and question(s). Return JSON with exactly: {overall:number,confidence:"low"|"medium"|"high",fluency:{band:number,notes:string[],next:string[]},lexical:{band:number,notes:string[],next:string[]},grammar:{band:number,notes:string[],next:string[]},pronunciation:{band:null,notes:string[],next:string[]},summary:string,retry:boolean,retry_reason:string}. Scores are practice estimates from 0 to 9 in 0.5 increments, never official IELTS scores. Pronunciation must always have band null because transcript-only input cannot assess acoustic pronunciation. Explain that limitation briefly. Be supportive Uzbek. Give no more than 3 concrete next actions total. If short or missing answers for the requested part, set retry true and state the reason.`;

function client(req: Request) {
  const token = req.headers.get('Authorization') || '';
  return createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: token } } });
}
function validDay(value: unknown) { const n = Number(value); return Number.isInteger(n) && n >= 1 && n <= 30 ? n : null; }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  try {
    const anon = client(req);
    const { data: { user }, error: userError } = await anon.auth.getUser();
    if (userError || !user) return json({ error: 'Avval email orqali kiring.' }, 401);
    const body = await req.json();
    const action = String(body.action || 'feedback');
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    if (action === 'progress') {
      if (!body.day) {
        const { data, error } = await admin.from('speaking_progress').select('course_day,pronunciation_done,shadowing_done,speaking_done,completed_at').eq('user_id', user.id);
        if (error) throw error;
        return json({ progress: Object.fromEntries((data || []).map(p => [p.course_day, p])) });
      }
      const day = validDay(body.day);
      const sections = Array.isArray(body.sections) ? body.sections.map(String).filter((s: string) => allowedSections.has(s)) : [];
      if (!day || !sections.length) return json({ error: 'Kun va kamida bitta haqiqiy mashq qismi kerak.' }, 400);
      const { data: old } = await admin.from('speaking_progress').select('pronunciation_done,shadowing_done,speaking_done').eq('user_id', user.id).eq('course_day', day).maybeSingle();
      const next = {
        user_id: user.id, course_day: day,
        pronunciation_done: Boolean(old?.pronunciation_done || sections.includes('pronunciation')),
        shadowing_done: Boolean(old?.shadowing_done || sections.includes('shadowing')),
        speaking_done: Boolean(old?.speaking_done || sections.includes('speaking')),
        updated_at: new Date().toISOString(),
      };
      const complete = next.pronunciation_done && next.shadowing_done && next.speaking_done;
      const { data, error } = await admin.from('speaking_progress').upsert({ ...next, completed_at: complete ? new Date().toISOString() : null }, { onConflict: 'user_id,course_day' }).select('course_day,pronunciation_done,shadowing_done,speaking_done,completed_at').single();
      if (error) throw error;
      return json({ progress: { [day]: data } });
    }

    if (action === 'history') {
      const { data, error } = await admin.from('attempts').select('id,course_day,completed_at,status,score,created_at').eq('user_id', user.id).eq('product_type', 'speaking').eq('status', 'completed').order('completed_at', { ascending: false }).limit(24);
      if (error) throw error;
      return json({ attempts: data || [] });
    }

    if (action !== 'feedback') return json({ error: 'Noma’lum amal.' }, 400);
    const day = validDay(body.day), part = String(body.part || 'full'), question = String(body.question || '').trim(), transcript = String(body.transcript || '').trim();
    const audioPath = body.audioPath ? String(body.audioPath) : null;
    const requestId = String(body.idempotencyKey || '').trim();
    const minimum = part === 'full' ? 120 : part === 'part2' ? 60 : 30;
    if (!day || !allowedParts.has(part) || !question || transcript.length < minimum) return json({ error: `Kun, format va kamida ${minimum} belgilik mazmunli transcript kerak.` }, 400);
    if (!requestId || requestId.length > 120) return json({ error: 'Xavfsiz qayta urinish kaliti kerak.' }, 400);
    if (audioPath && !audioPath.startsWith(`${user.id}/`)) return json({ error: 'Audio manzili noto‘g‘ri.' }, 403);

    const { data: existing, error: existingError } = await admin.from('attempts').select('id,status,result_summary').eq('user_id', user.id).eq('product_type', 'speaking').eq('client_request_id', requestId).maybeSingle();
    if (existingError) throw existingError;
    if (existing?.status === 'completed') return json({ attemptId: existing.id, feedback: existing.result_summary, reused: true });
    if (existing) return json({ error: 'Bu urinish hali qayta ishlanmoqda; sahifani yangilab keyin tekshiring.' }, 409);

    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicKey) return json({ error: 'AI baholash hozircha sozlanmagan.' }, 503);
    const segments = body.segments && typeof body.segments === 'object' ? body.segments : null;
    const { data: pending, error: pendingError } = await admin.from('attempts').insert({
      user_id: user.id, product_type: 'speaking', module_type: 'speaking', qadam_cost: 1, status: 'analysis_pending', started_at: new Date().toISOString(), course_day: day,
      prompt_snapshot: { part, question, segments }, transcript, audio_path: audioPath, client_request_id: requestId,
      model_metadata: { provider: 'anthropic', limitation: 'Transcript-only: pronunciation is never acoustically scored.' },
    }).select('id').single();
    if (pendingError?.code === '23505') return json({ error: 'Bu urinish qayta ishlanmoqda; birozdan keyin yangilang.' }, 409);
    if (pendingError) throw pendingError;
    const { data: charged, error: chargeError } = await admin.rpc('consume_speaking_qadam', { p_attempt_id: pending.id });
    if (chargeError) throw chargeError;
    if (!charged) { await admin.from('attempts').update({ status: 'cancelled' }).eq('id', pending.id); return json({ error: 'AI feedback uchun kamida 1 Qadam kerak.' }, 402); }

    const started = Date.now();
    const ai = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: 'claude-3-5-haiku-latest', max_tokens: 1400, system: systemPrompt, messages: [{ role: 'user', content: `Day ${day}; IELTS ${part}.\nQuestion(s): ${question}\nTranscript(s): ${transcript}` }] }) });
    if (!ai.ok) { await admin.rpc('refund_speaking_qadam', { p_attempt_id: pending.id, p_reason: 'anthropic_error' }); await admin.from('attempts').update({ status: 'refunded' }).eq('id', pending.id); return json({ error: 'AI baholash vaqtincha ishlamadi. Qadamingiz qaytarildi.' }, 502); }
    const payload = await ai.json(), text = payload?.content?.[0]?.text || '', clean = text.replace(/^```json\s*|\s*```$/g, '').trim();
    let feedback: Record<string, unknown>;
    try { feedback = JSON.parse(clean); } catch { await admin.rpc('refund_speaking_qadam', { p_attempt_id: pending.id, p_reason: 'invalid_provider_payload' }); await admin.from('attempts').update({ status: 'refunded' }).eq('id', pending.id); return json({ error: 'AI javobi kutilgan formatda kelmadi. Qadamingiz qaytarildi.' }, 502); }
    // Never trust a model to override the transcript-only limitation.
    feedback.pronunciation = { band: null, notes: ['Transcript talaffuzning akustik sifatini o‘lchamaydi.'], next: ['Recordingni eshitib, aniqlik va urg‘uni o‘zingiz tekshiring.'] };
    const score = { overall: feedback.overall, fluency: (feedback.fluency as Record<string, unknown>)?.band, lexical: (feedback.lexical as Record<string, unknown>)?.band, grammar: (feedback.grammar as Record<string, unknown>)?.band, pronunciation: null };
    const { data: attempt, error: updateError } = await admin.from('attempts').update({ status: 'completed', submitted_at: new Date().toISOString(), completed_at: new Date().toISOString(), score, result_summary: feedback, model_metadata: { provider: 'anthropic', model: 'claude-3-5-haiku-latest', limitation: 'Transcript-only: pronunciation is never acoustically scored.' } }).eq('id', pending.id).select('id').single();
    if (updateError) throw updateError;
    await admin.from('ai_jobs').insert({ attempt_id: attempt.id, stage: 'feedback', provider: 'anthropic', model: 'claude-3-5-haiku-latest', status: 'succeeded', idempotency_key: `speaking-job:${pending.id}`, latency_ms: Date.now() - started, metadata: { course_day: day, part } });
    const { data: old } = await admin.from('speaking_progress').select('pronunciation_done,shadowing_done').eq('user_id', user.id).eq('course_day', day).maybeSingle();
    const next = { user_id: user.id, course_day: day, pronunciation_done: Boolean(old?.pronunciation_done), shadowing_done: Boolean(old?.shadowing_done), speaking_done: true, updated_at: new Date().toISOString() };
    await admin.from('speaking_progress').upsert({ ...next, completed_at: next.pronunciation_done && next.shadowing_done ? new Date().toISOString() : null }, { onConflict: 'user_id,course_day' });
    return json({ attemptId: attempt.id, feedback });
  } catch (error) { console.error(error); return json({ error: 'Kutilmagan xatolik yuz berdi.' }, 500); }
});
