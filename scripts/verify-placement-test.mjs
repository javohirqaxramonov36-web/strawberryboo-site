import fs from 'node:fs';
import path from 'node:path';

const levels = ['a1', 'a2', 'b1', 'b2', 'c1'];
const root = process.cwd();
let totalQuestions = 0;

for (const level of levels) {
  const file = path.join(root, 'src', 'data', `placement-test-${level}.json`);
  const bank = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (bank.level !== level.toUpperCase()) throw new Error(`${file}: level mismatch`);
  if (!Array.isArray(bank.questions)) throw new Error(`${file}: questions must be an array`);

  for (const question of bank.questions) {
    totalQuestions++;
    if (!question.id || !question.question || !question.correctOption) {
      throw new Error(`${file}: question is missing id, question, or correctOption`);
    }
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      throw new Error(`${file} ${question.id}: exactly 4 options are required`);
    }
    const ids = question.options.map((option) => option.id);
    if (new Set(ids).size !== 4 || ids.some((id) => !id)) {
      throw new Error(`${file} ${question.id}: option ids must be unique and non-empty`);
    }
    if (!ids.includes(question.correctOption)) {
      throw new Error(`${file} ${question.id}: correctOption must match an option id`);
    }
  }
  console.log(`OK ${path.relative(root, file)} — ${bank.questions.length} question(s)`);
}

console.log(`Placement schema verified — ${totalQuestions} question(s) across A1–C1 banks.`);
