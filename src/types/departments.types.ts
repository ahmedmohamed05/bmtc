export type DepartmentHeadInfo = {
  avatar: string | null;
  email: string;
  firstName: string;
  lastName: string;
};

export type IncludedDepartmentLecturer = {
  id: number;
  name: string;
  title: "LECTURER_ASSISTANT" | "DR" | "PROFESSOR";
  jobTitle: string | null;
  certificate: "BACHELOR" | "MASTER" | "PHD";
  certificateText: string | null;
  major: string | null;
  image: string | null;
  graduatedUniversity: string | null;
};

export type Department = {
  id: number;
  name: string;
  nameAr: string;
  shortName: string;
  createdAt: string; // ISODate
  description: string | null;
  vision: string | null;
  message: string | null;
  majorDefinition: string | null;
  morningAverage: number | null;
  eveningAverage: number | null;
  parallelAverage: number | null;
  eveningPrice: number | null;
  parallelPrice: number | null;
  adminId: number;
  goals: string[];
  works: string[];
  images: string[];
  head?: DepartmentHeadInfo | null;
  lecturers?: IncludedDepartmentLecturer[];
};

export type DepartmentIncludeOptions = {
  images?: boolean;
  works?: boolean;
  goals?: boolean;
  lecturers?: boolean;
  head?: boolean;
};

export type DepartmentCountResponse = {
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
};
