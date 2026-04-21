import env from "../config/env";

export interface DepartmentCounts {
  total: {
    total: number;
    morning: number;
    evening: number;
    parallel: number;
    lecturers: number;
  };
  perDepartment: {
    id: number;
    name: string;
    nameAr: string;
    shortName: string;
    adminId: number;
    total: number;
    morning: number;
    evening: number;
    parallel: number;
    lecturers: number;
  }[];
}

export async function fetchDepartmentsCount(): Promise<DepartmentCounts> {
  const res = await fetch(`${env.VITE_API_URL}/departments/count`);
  if (!res.ok) throw new Error(`Failed to fetch department counts: ${res.status}`);
  return res.json();
}
