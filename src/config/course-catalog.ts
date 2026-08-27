import coursesData from '../data/courses.json';

export type CourseStatus = 'available' | 'upcoming';

type CourseRecord = {
  slug: string;
  status: CourseStatus;
  countInPublicTotal: boolean;
};

// Public totals are derived from src/data/courses.json. That file is the single
// source of truth for course metadata; set countInPublicTotal only for courses
// that should be included in the headline total.
export const courseCatalog = (coursesData.courses as CourseRecord[])
  .map(({ slug, status }) => ({ slug, status })) as readonly { slug: string; status: CourseStatus }[];

export const totalCourseCount = courseCatalog.length;
export const availableCourseCount = courseCatalog.filter((course) => course.status === 'available').length;
export const upcomingCourseCount = courseCatalog.filter((course) => course.status === 'upcoming').length;
