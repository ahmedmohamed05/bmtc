import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { LecturerWithDepartment } from "../types/lecturers.types";
import LecturerServices from "../services/lecturers.services";

function getArabicErrorMessage(message: string): string {
  // Exact API error messages from docs
  const exactMap: Record<string, string> = {
    "Too many requests to list lecturers. Try again later":
      "طلبات كثيرة لعرض المحاضرين. يرجى المحاولة لاحقاً",
    "Too many requests to get lecturers stats. Try again later":
      "طلبات كثيرة للحصول على إحصائيات المحاضرين. يرجى المحاولة لاحقاً",
    "Too many requests to get department lecturers. Try again later":
      "طلبات كثيرة لعرض محاضري القسم. يرجى المحاولة لاحقاً",
    "Too many requests to get lecturer. Try again later":
      "طلبات كثيرة لعرض المحاضر. يرجى المحاولة لاحقاً",
    "Lecturer not found": "المحاضر غير موجود",
  };
  if (exactMap[message]) return exactMap[message];

  // Pattern-based matches for backend enum validation errors
  if (message.includes("title") && message.includes("Invalid option"))
    return "الدرجة العلمية غير صالحة. يجب اختيار واحدة من: مساعد، دكتور، أستاذ";
  if (message.includes("certificate") && message.includes("Invalid option"))
    return "نوع الشهادة غير صالح. يجب اختيار واحدة من: بكالوريوس، ماجستير، دكتوراه";
  if (message.includes("Invalid option")) return "قيمة غير صالحة في أحد الحقول";

  return message;
}

export default function useLecturers() {
  const [lecturers, setLecturers] = useState<LecturerWithDepartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);
  const fetchLecturers = useCallback(async () => {
    setLoading(true);
    setError(null);

    let res;
    res = await LecturerServices.getLecturers();

    if (res.kind !== "success") {
      setError(getArabicErrorMessage(res.message));
      setLoading(false);
      return;
    }

    setLecturers(Array.isArray(res.data) ? res.data : []);
    setLoading(false);
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchLecturers();
  }, [fetchLecturers]);

  return useMemo(
    () => ({
      lecturers,
      loading,
      error,
      clearError,
      fetchLecturers,
    }),
    [lecturers, loading, error, clearError, fetchLecturers]
  );
}
