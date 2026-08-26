import a1 from './placement-test-a1.json';
import a2 from './placement-test-a2.json';
import b1 from './placement-test-b1.json';
import b2 from './placement-test-b2.json';
import c1 from './placement-test-c1.json';

export const PLACEMENT_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;
export type PlacementLevel = (typeof PLACEMENT_LEVELS)[number];

export interface PlacementOption {
  id: string;
  text: string;
}

export interface PlacementQuestion {
  id: string;
  level: PlacementLevel;
  question: string;
  options: PlacementOption[];
  correctOption: string;
}

const banks = [a1, a2, b1, b2, c1];

export const placementQuestions: PlacementQuestion[] = banks.flatMap((bank) =>
  bank.questions.map((question) => ({ ...question, level: bank.level as PlacementLevel }))
);

export interface PlacementAnswer {
  id: string;
  level: PlacementLevel;
  correct: boolean;
}
