import apiClient from "./api-client.services";
import type { Department, DepartmentIncludeOptions, DepartmentCountResponse } from "../types/departments.types";

function buildIncludeParams(options?: DepartmentIncludeOptions): string {
  if (!options) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    if (value) params.set(key, "true");
  }
  return params.toString();
}

export default class DepartmentsServices {
  private static endpoint_m = "/departments";

  static async getAllDepartments(options?: DepartmentIncludeOptions) {
    const qs = buildIncludeParams(options);
    const endpoint = `${this.endpoint_m}/all${qs ? `?${qs}` : ""}`;
    return apiClient<Department[]>(endpoint, { method: "GET", credentials: "include" });
  }

  static async getDepartmentById(id: number, options?: DepartmentIncludeOptions) {
    const qs = buildIncludeParams(options);
    const endpoint = `${this.endpoint_m}/id?id=${id}${qs ? `&${qs}` : ""}`;
    return apiClient<Department>(endpoint, { method: "GET", credentials: "include" });
  }

  static async searchDepartments(searchText: string, options?: DepartmentIncludeOptions) {
    const qs = buildIncludeParams(options);
    const endpoint = `${this.endpoint_m}/search?searchText=${encodeURIComponent(searchText)}${qs ? `&${qs}` : ""}`;
    return apiClient<Department[]>(endpoint, { method: "GET", credentials: "include" });
  }

  static async getDepartmentsCount() {
    const endpoint = `${this.endpoint_m}/count`;
    return apiClient<DepartmentCountResponse>(endpoint, { method: "GET", credentials: "include" });
  }
}
