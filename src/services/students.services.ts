import type {
  Student,
  PaginatedStudentsResponse,
  GetStudentsByDepartmentQuery,
  GetStudentsByStageQuery,
  PaginationParams,
} from "../types/students.types";
import apiClient from "./api-client.services";

const BASE = "/students";

function buildParams(
  query: Record<string, string | number | undefined>
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export default class StudentsServices {
  static async getAllStudents(query?: PaginationParams) {
    return apiClient<PaginatedStudentsResponse>(
      `${BASE}${buildParams({ ...query })}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
  }

  static async getStudentsByDepartment(query: GetStudentsByDepartmentQuery) {
    return apiClient<PaginatedStudentsResponse>(
      `${BASE}/department${buildParams({ ...query })}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
  }

  static async getStudentsByStage(query: GetStudentsByStageQuery) {
    return apiClient<PaginatedStudentsResponse>(
      `${BASE}/stage${buildParams({ ...query })}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
  }

  static async getStudentById(id: number) {
    return apiClient<Student>(`${BASE}/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }
}
