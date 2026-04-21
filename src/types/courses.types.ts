export type Semester = "FIRST" | "SECOND";

export type Course = {
  id: number;
  name: string;
  nameAr: string | null;
  semester: Semester;
  hasLabLessons: boolean;
  departmentId: number;
  stageId: number;
  department?: {
    id: number;
    name: string;
    shortName: string;
  };
  stage?: {
    id: number;
    stageNumber: number;
    label: string;
  };
};

export type CourseQueryRequest = {
  limit?: number;
  offset?: number;
  departmentId?: number;
  stageId?: number;
};

export type PaginatedCoursesResponse = {
  courses: Course[];
  limit: number;
  offset: number;
  hasMore: boolean;
};

export type CourseCountResponse = {
  count: number;
};
