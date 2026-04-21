import { useCallback, useMemo, useState } from "react";
import type { Department, DepartmentIncludeOptions } from "../types/departments.types";
import DepartmentsServices from "../services/departments.services";

function getArabicErrorMessage(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (!message || typeof message !== "string") return "حدث خطأ غير معروف";
  
  if (lowerMsg.includes("too many requests to list departments")) {
    return "طلبات كثيرة لعرض الأقسام. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("too many requests to get department")) {
    return "طلبات كثيرة لعرض القسم. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("too many department search requests")) {
    return "محاولات بحث كثيرة. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("too many department count requests")) {
    return "طلبات كثيرة لحساب الأقسام. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("no department found with id")) {
    return "لم يتم العثور على القسم.";
  }
  return message;
}

export default function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchAll = useCallback(async (options?: DepartmentIncludeOptions) => {
    setLoading(true);
    setError(null);
    const res = await DepartmentsServices.getAllDepartments(options);
    if (res.kind !== "success") {
      setError(getArabicErrorMessage(res.message));
    } else {
      setDepartments(res.data || []);
    }
    setLoading(false);
  }, []);

  const fetchById = useCallback(async (id: number, options?: DepartmentIncludeOptions) => {
    setLoading(true);
    setError(null);
    const res = await DepartmentsServices.getDepartmentById(id, options);
    if (res.kind !== "success") {
      setError(getArabicErrorMessage(res.message));
    } else {
      setCurrentDepartment(res.data);
    }
    setLoading(false);
  }, []);

  const search = useCallback(async (searchText: string, options?: DepartmentIncludeOptions) => {
    if (!searchText) {
      await fetchAll(options);
      return;
    }
    setLoading(true);
    setError(null);
    const res = await DepartmentsServices.searchDepartments(searchText, options);
    if (res.kind !== "success") {
      setError(getArabicErrorMessage(res.message));
    } else {
      setDepartments(res.data || []);
    }
    setLoading(false);
  }, [fetchAll]);

  const getCount = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await DepartmentsServices.getDepartmentsCount();
    if (res.kind !== "success") {
      setError(getArabicErrorMessage(res.message));
      setLoading(false);
      return null;
    }
    setLoading(false);
    return res.data;
  }, []);

  return useMemo(() => ({
    departments,
    currentDepartment,
    loading,
    error,
    clearError,
    fetchAll,
    fetchById,
    search,
    getCount,
  }), [departments, currentDepartment, loading, error, clearError, fetchAll, fetchById, search, getCount]);
}
