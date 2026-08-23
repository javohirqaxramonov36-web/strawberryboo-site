/**
 * Approved student reviews only.
 *
 * Do not add a review until the student has granted permission and the quote,
 * attribution, course association, and approval date have been verified.
 * Keep sourceUrl private when it contains personal data; use it only when a
 * public, consented source is appropriate.
 */
export type TestimonialLocale = 'uz' | 'ru' | 'en';

export interface ApprovedTestimonial {
  /** Stable internal identifier, e.g. "2026-09-learner-01". */
  id: string;
  /** Course slugs this approved review may appear on. */
  courseSlugs: string[];
  /** Exact approved wording; never paraphrase a learner as a testimonial. */
  quote: string;
  /** Approved public attribution. Use a first name only when that is the consented format. */
  authorName: string;
  /** Optional, consented context such as a role or study goal. */
  authorContext?: string;
  locale: TestimonialLocale;
  /** Date approval was confirmed (YYYY-MM-DD). */
  approvedAt: string;
  /** Optional public, consented proof link. */
  sourceUrl?: string;
  /** Optional public, consented image URL. */
  imageUrl?: string;
}

// TODO: Add only real, permissioned, verified reviews using the contract above.
// Intentionally empty: the UI must not create social proof before it exists.
export const approvedTestimonials: readonly ApprovedTestimonial[] = [];
