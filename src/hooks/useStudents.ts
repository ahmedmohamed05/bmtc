import { useCallback, useMemo, useState } from "react";
import type { Student } from "../types/students.types";
import StudentsServices from "../services/students.services";

function getArabicErrorMessage(message: string): string {
  const exactMap: Record<string, string> = {
    "Too many requests to list students. Try again later":
      "طلبات كثيرة لعرض القائمة. يرجى المحاولة لاحقاً",
    "Too many requests to list students by department. Try again later":
      "طلبات كثيرة لعرض طلاب القسم. يرجى المحاولة لاحقاً",
    "Too many requests to list students by stage. Try again later":
      "طلبات كثيرة لعرض طلاب المرحلة. يرجى المحاولة لاحقاً",
    "Too many requests to get student by id. Try again later":
      "طلبات كثيرة لعرض تفاصيل الطالب. يرجى المحاولة لاحقاً",
    "Too many requests to count students by department. Try again later":
      "طلبات كثيرة لإحصائيات القسم. يرجى المحاولة لاحقاً",
    "Too many requests to count students by stage. Try again later":
      "طلبات كثيرة لإحصائيات المرحلة. يرجى المحاولة لاحقاً",
    "Too many requests to filter students. Try again later":
      "طلبات بحث وتصفية كثيرة. يرجى المحاولة لاحقاً",
    "Too many student search requests. Try again later":
      "محاولات بحث كثيرة. يرجى المحاولة لاحقاً",
    "Department not found": "القسم غير موجود",
    "Student not found": "الطالب غير موجود",
    "Search name cannot be empty": "كلمة البحث لا يمكن أن تكون فارغة",
    "Unauthorized, You don't have the right permissions":
      "ليس لديك الصلاحيات الكافية للقيام بهذا الإجراء",
  };
  if (exactMap[message]) return exactMap[message];
  if (message.toLowerCase().includes("validation error"))
    return "بيانات غير صالحة";
  return message;
}

const DEFAULT_LIMIT = 20;

type Filter = {
  type: "departmetId" | "stageId" | "none";
  value: number;
  newOffset: number;
};

export default function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const [filter, setFilter] = useState<Filter>({
    type: "none",
    value: 0,
    newOffset: 0,
  });

  const fetchStudentsList = useCallback(async (filter: Filter) => {
    setLoading(true);
    setError(null);
    setFilter(filter);

    const limit = DEFAULT_LIMIT;

    let res;

    try {
      if (filter.type === "departmetId") {
        res = await StudentsServices.getStudentsByDepartment({
          limit,
          offset: filter.newOffset,
          departmentId: filter.value,
        });
      } else if (filter.type === "stageId") {
        res = await StudentsServices.getStudentsByStage({
          limit,
          offset: filter.newOffset,
          stage: filter.value,
        });
      } else {
        res = await StudentsServices.getAllStudents({
          limit,
          offset: filter.newOffset,
        });
      }
      if (res) {
        if (res.kind !== "success") {
          setError(getArabicErrorMessage(res.message));
        } else if (res.data && "data" in res.data) {
          const resultData = res.data.data;
          if (filter.newOffset === 0) {
            setStudents(resultData);
          } else {
            setStudents((prev) => [...prev, ...resultData]);
          }
          setTotal(res.data.total ?? 0);
          setHasMore(filter.newOffset + limit < (res.data.total ?? 0));
        }
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await fetchStudentsList(filter);
  }, [loading, hasMore, fetchStudentsList, filter]);

  return useMemo(
    () => ({
      students,
      total,
      hasMore,
      loading,
      error,
      clearError,
      fetchMore,
    }),
    [students, total, hasMore, loading, error, clearError, fetchMore]
  );
}
