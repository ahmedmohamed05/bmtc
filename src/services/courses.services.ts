import apiClient from "./api-client.services";
import type {
  Course,
  CourseQueryRequest,
  PaginatedCoursesResponse,
  CourseCountResponse,
} from "../types/courses.types";

export default class CoursesServices {
  private static endpoint_m = "/courses";

  static async getAllCourses(query?: CourseQueryRequest) {
    const params = new URLSearchParams();
    if (query?.limit !== undefined) params.set("limit", String(query.limit));
    if (query?.offset !== undefined) params.set("offset", String(query.offset));
    if (query?.departmentId !== undefined)
      params.set("departmentId", String(query.departmentId));
    if (query?.stageId !== undefined)
      params.set("stageId", String(query.stageId));

    const qs = params.toString();
    const endpoint = `${this.endpoint_m}${qs ? `?${qs}` : ""}`;

    return apiClient<PaginatedCoursesResponse>(endpoint, { method: "GET" });
  }

  static async getCourseById(id: number) {
    return apiClient<Course>(`${this.endpoint_m}/${id}`, { method: "GET" });
  }

  static async getCoursesCount() {
    return apiClient<CourseCountResponse>(`${this.endpoint_m}/count`, {
      method: "GET",
    });
  }
}
