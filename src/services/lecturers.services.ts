import type {
  LecturerQueryRequest,
  LecturerWithDepartment,
  LecturerStats,
} from "../types/lecturers.types";
import apiClient from "./api-client.services";

export default class LecturerServices {
  private static endpoint_m = "/lecturers";

  static async getLecturers(
    query?: Omit<LecturerQueryRequest, "departmentId">
  ) {
    let endpoint = this.endpoint_m;
    const params = new URLSearchParams();
    if (query?.limit !== undefined) params.set("limit", query.limit.toString());
    if (query?.offset !== undefined)
      params.set("offset", query.offset.toString());
    const qs = params.toString();
    if (qs) endpoint += `?${qs}`;

    return apiClient<LecturerWithDepartment[]>(endpoint, {
      credentials: "include",
    });
  }

  static async getDepartmentLecturers(departmentId: number) {
    const endpoint = `${this.endpoint_m}/department-lecturers?id=${departmentId}`;
    return apiClient<LecturerWithDepartment[]>(endpoint, {
      credentials: "include",
    });
  }

  static async getStats() {
    return apiClient<LecturerStats>(`${this.endpoint_m}/stats`, {
      credentials: "include",
    });
  }

  static async getLecturerById(id: number) {
    return apiClient<LecturerWithDepartment>(`${this.endpoint_m}/${id}`, {
      credentials: "include",
    });
  }

  static async deleteLecturer(id: number) {
    return apiClient<LecturerWithDepartment>(`${this.endpoint_m}/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
  }
}
