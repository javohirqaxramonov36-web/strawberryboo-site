export type CourseStatus = 'available' | 'upcoming';

// Single source for public course totals. Keep planned courses separate from
// courses that can currently be accessed or purchased.
export const courseCatalog = [
  { slug: 'prompt-engineering', status: 'available' },
  { slug: 'obsidian', status: 'available' },
  { slug: 'ai-agentlar', status: 'available' },
  { slug: 'ielts-listening', status: 'available' },
  { slug: 'ielts-reading', status: 'available' },
  { slug: 'ielts-writing', status: 'available' },
  { slug: 'ielts-speaking', status: 'available' },
  { slug: 'admission-process', status: 'available' },
  { slug: 'tekin-ai', status: 'available' },
  { slug: 'mac-tezlik-sirlari', status: 'available' },
  { slug: 'autocad-on-mac', status: 'available' },
  { slug: 'financial-literacy', status: 'upcoming' },
  { slug: 'vibe-coding', status: 'upcoming' },
  { slug: 'data-analytics', status: 'upcoming' },
  { slug: 'backend-python', status: 'upcoming' },
  { slug: 'general-english-beginner', status: 'upcoming' },
  { slug: 'general-english-elementary', status: 'upcoming' },
  { slug: 'general-english-pre-intermediate', status: 'upcoming' },
  { slug: 'general-english-intermediate', status: 'upcoming' },
  { slug: 'general-english-upper-intermediate', status: 'upcoming' },
  { slug: 'general-english-advanced', status: 'upcoming' },
  { slug: 'sat-math', status: 'upcoming' },
  { slug: 'sat-english', status: 'upcoming' },
  { slug: 'desmos-applications', status: 'upcoming' },
] as const satisfies readonly { slug: string; status: CourseStatus }[];

export const totalCourseCount = courseCatalog.length;
export const availableCourseCount = courseCatalog.filter((course) => course.status === 'available').length;
