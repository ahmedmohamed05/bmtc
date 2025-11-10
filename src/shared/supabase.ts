import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
	console.warn(
		"Supabase environment variables are not set. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file"
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TODO Database types

type UUID = string; // Create a branded type
type StudyType = "morning" | "evening";

// TODO amdin inteface

export interface AdminLoginLogs {
	id: number;
	admin_id: UUID;
	date: string;
	email: string;
}

interface BaseEnttity {
	id: number;
	admin_id: UUID; // FK
	updated_by: UUID | null; // FK
	created_at: string;
	updated_at: string | null;
}

export interface News extends BaseEnttity {
	title: string;
	body: string;
	thumbnail_url: string;
}

export interface Event extends BaseEnttity {
	title: string;
	body: string;
}

export interface Book extends BaseEnttity {
	department_id: number; // FK reference Department (Same as the major)
	title: string;
	author: string;
	book_rank: number;
	row_number: number;
	print_date: string;
}

export interface Magazine extends BaseEnttity {
	title: string;
	issuing: string;
	major: string;
	classification_number: number;
	volume: number | null;
	amount: number | null;
	year: number;
	row_number: number;
}

export interface Department {
	id: number;
	full_name: string;
	short_name: string;
	weekly_table: number; // FK
	examination_table: number; // FK
	// TODO subjects
}

// Teacher
export interface Teacher extends BaseEnttity {
	first_name: string;
	second_name: string;
	last_name: string;
	major: string;
	title: string; // (prof, assistant, Lecturer , assistan lecturer)
	avatar_url: string;
}

// Bridge table
export interface TeacherAndDepartment {
	id: number;
	admin_id: UUID; // FK reference to admins table
	updated_by: UUID | null; // FK reference to admins table
	teacher_id: number; // FK reference to teachers (staff) table
	department_id: number; // FK reference to departments table
}

export interface graduationImage {
	id: number;
	admin_id: UUID; // Fk reference admins table
	updated_by: UUID | null; // Fk reference admins table
	department_id: number; // Fk reference departments table
	year: number;
	img_url: string;
}

export interface LetterAndThese extends BaseEnttity {
	department_id: number; // Fk reference departments table
	Certificate: string;
	arabic_title: string;
	english_title: string;
	year: number;
}
export interface GraduatedStudent extends BaseEnttity {
	department_id: number; // Fk reference departments table
	year: number;
	round: number; // الدور
	first_name: string;
	second_name: string;
	last_name: string;
	study_type: StudyType;
}

export interface TopGraduatedStudent extends BaseEnttity, GraduatedStudent {
	order: number;
	grade: string;
}

// TODO
// export interface SubjectType {
//   id: number;
// }

// export interface Course {
// 	id: number;
//   name_ar: string;
//   name_en: string;
//   type_id;
// }

export interface Exam extends BaseEnttity {
	department_id: number; // Fk reference departments table
	subject_id: number; // FK
	teacher_id: number; // FK
	exam_type: string;
	stage: 1 | 2 | 3 | 4;
	year: number;
}
