export type BasicDepartment = {
  id: number;
  name: string;
  nameAr: string | null;
  shortName?: string | null;
};

export type Student = {
  id: number;
  name: string;
  age: number;
  stage: number;
  study: "MORNING" | "EVENING" | "PARALLEL";
  departmentId: number;
  createdAt: string;
  updatedAt: string;
  department: BasicDepartment;
};

export type PaginationParams = {
  limit?: number;
  offset?: number;
};

export type GetStudentsByDepartmentQuery = PaginationParams & {
  departmentId: number;
};

export type GetStudentsByStageQuery = PaginationParams & {
  stage: number;
};

export type PaginatedStudentsResponse = {
  data: Student[];
  total: number;
  limit: number;
  offset: number;
};
