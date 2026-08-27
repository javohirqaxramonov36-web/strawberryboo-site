import {
  PLACEMENT_LEVELS,
  type PlacementAnswer,
  type PlacementLevel,
  type PlacementQuestion,
} from '../data/placement-test';

export function getLevelIndex(level: PlacementLevel): number {
  return PLACEMENT_LEVELS.indexOf(level);
}

export function selectNextPlacementQuestion(
  questions: PlacementQuestion[],
  answers: PlacementAnswer[],
  currentLevel: PlacementLevel,
  wasCorrect: boolean
): PlacementQuestion | undefined {
  const answered = new Set(answers.map((answer) => answer.id));
  const currentIndex = getLevelIndex(currentLevel);
  const direction = wasCorrect ? 1 : -1;
  const candidateIndexes = [currentIndex + direction, currentIndex, currentIndex - direction];

  for (const index of candidateIndexes) {
    if (index < 0 || index >= PLACEMENT_LEVELS.length) continue;
    const candidate = questions.find(
      (question) => question.level === PLACEMENT_LEVELS[index] && !answered.has(question.id)
    );
    if (candidate) return candidate;
  }

  return questions.find((question) => !answered.has(question.id));
}

export function assessPlacement(
  answers: PlacementAnswer[]
): { level: PlacementLevel; correctCount: number; total: number; percentage: number } {
  const correctAnswers = answers.filter((answer) => answer.correct);
  const highestConfirmedIndex = correctAnswers.reduce(
    (highest, answer) => Math.max(highest, getLevelIndex(answer.level)),
    0
  );
  const total = answers.length;
  const correctCount = correctAnswers.length;
  const percentage = total ? Math.round((correctCount / total) * 100) : 0;

  return {
    level: PLACEMENT_LEVELS[highestConfirmedIndex],
    correctCount,
    total,
    percentage,
  };
}
