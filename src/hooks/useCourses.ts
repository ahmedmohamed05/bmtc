import { useCallback, useMemo, useState, useRef } from "react";
import type { Course, CourseQueryRequest } from "../types/courses.types";
import CoursesServices from "../services/courses.services";

function getArabicErrorMessage(message: string): string {
  if (!message || typeof message !== "string") return "حدث خطأ غير معروف";
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("too many requests to list courses"))
    return "طلبات كثيرة لعرض الكورسات. يرجى المحاولة لاحقاً.";
  if (lowerMsg.includes("too many requests to get course"))
    return "طلبات كثيرة لجلب بيانات الكورس. يرجى المحاولة لاحقاً.";
  if (lowerMsg.includes("too many requests to count courses"))
    return "طلبات كثيرة لحساب الكورسات. يرجى المحاولة لاحقاً.";

  if (lowerMsg.includes("course not found"))
    return "لم يتم العثور على الكورس المطلوب.";
  if (lowerMsg.includes("department not found")) return "القسم غير موجود.";
  if (lowerMsg.includes("stage not found")) return "المرحلة غير موجودة.";
  if (lowerMsg.includes("validation error"))
    return "خطأ في التحقق من البيانات.";

  return message;
}

export default function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const loadingRef = useRef(false);

  const startOperation = useCallback(() => {
    loadingRef.current = true;
    setLoading(true);
    setError(null);
  }, []);

  const endOperation = useCallback((err: string | null = null) => {
    loadingRef.current = false;
    setLoading(false);
    setError(err);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const fetchCourses = useCallback(
    async (
      query?: Omit<CourseQueryRequest, "limit" | "offset">,
      resetState = false
    ) => {
      if (loadingRef.current) return;

      startOperation();
      const currentOffset = resetState ? 0 : offset;

      const res = await CoursesServices.getAllCourses({
        ...query,
        limit,
        offset: currentOffset,
      });

      if (res.kind !== "success") {
        endOperation(getArabicErrorMessage(res.message));
        return;
      }

      if (!res.data) {
        endOperation("فشل في استلام البيانات");
        return;
      }

      const { courses: fetchedCourses, hasMore: moreAvailable } = res.data;

      if (resetState) {
        setCourses(fetchedCourses);
        setOffset(fetchedCourses.length);
      } else {
        setCourses((prev) => [...prev, ...fetchedCourses]);
        setOffset((prev) => prev + fetchedCourses.length);
      }

      setHasMore(moreAvailable);
      endOperation();
    },
    [offset, startOperation, endOperation]
  );

  const fetchById = useCallback(
    async (id: number) => {
      startOperation();
      const res = await CoursesServices.getCourseById(id);
      if (res.kind !== "success") {
        endOperation(getArabicErrorMessage(res.message));
        return;
      }
      setCurrentCourse(res.data);
      endOperation();
    },
    [startOperation, endOperation]
  );

  const getCoursesCount = useCallback(async () => {
    startOperation();
    const res = await CoursesServices.getCoursesCount();
    if (res.kind !== "success") {
      endOperation(getArabicErrorMessage(res.message));
      return null;
    }
    endOperation();
    return res.data?.count ?? 0;
  }, [startOperation, endOperation]);

  return useMemo(
    () => ({
      courses,
      currentCourse,
      loading,
      error,
      hasMore,
      clearError,
      fetchCourses,
      fetchById,
      getCoursesCount,
    }),
    [
      courses,
      currentCourse,
      loading,
      error,
      hasMore,
      clearError,
      fetchCourses,
      fetchById,
      getCoursesCount,
    ]
  );
}
