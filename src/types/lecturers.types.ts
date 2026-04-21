export type LecturerTitle = "LECTURER_ASSISTANT" | "DR" | "PROFESSOR";
export type LecturerCertificate = "BACHELOR" | "MASTER" | "PHD";

// Matches the API response object shape
export type LecturerWithDepartment = {
  id: number;
  name: string;
  title?: LecturerTitle | null;
  jobTitle?: string | null;
  createdAt?: string;
  certificate?: LecturerCertificate | null;
  certificateText?: string | null;
  major?: string | null;
  image?: string | null;
  graduatedUniversity?: string | null;
  departmentId?: number | null;
  department?: {
    id: number;
    name: string;
    nameAr: string | null;
  } | null;
};

export type LecturerQueryRequest = {
  limit?: number;
  offset?: number;
  departmentId?: number;
};

export type LecturerStats = {
  totalLecturers: number;
  titleCounters: {
    dr: number;
    assistant: number;
    prof: number;
  };
  certificateCounters: {
    bachelor: number;
    master: number;
    phd: number;
  };
};

export type LecturerQueryResponse = LecturerWithDepartment[];
