import coursesData from '../data/courses.json';

export type CourseStatus = 'available' | 'upcoming';
export type CatalogCourse = {
  slug: string;
  status: CourseStatus;
  type: string;
  cats: readonly string[];
};

/**
 * Single source of truth for the public catalog. The homepage, /kurslar/ and
 * pricing page should never maintain a second hand-written course count.
 * Bundles and the mock are included as public products; comingSoon records are
 * kept in the same catalog but counted separately.
 */
export const courseCatalog: readonly CatalogCourse[] = (coursesData.courses as any[]).map((course) => ({
  slug: course.slug,
  status: course.comingSoon || course.type === 'coming-soon' ? 'upcoming' : 'available',
  type: course.type,
  cats: course.cats ?? [],
}));

export const totalCourseCount = courseCatalog.length;
export const availableCourseCount = courseCatalog.filter((course) => course.status === 'available').length;
export const upcomingCourseCount = courseCatalog.filter((course) => course.status === 'upcoming').length;
