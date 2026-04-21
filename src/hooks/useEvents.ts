import { useCallback, useMemo, useRef, useState } from "react";
import type { Event } from "../types/events.types";
import EventsServices from "../services/events.services";

function getArabicErrorMessage(message: string): string {
  if (!message || typeof message !== "string") return "حدث خطأ غير معروف";
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("too many requests to get event")) {
    return "لقد تجاوزت الحد المسموح به لجلب بيانات الحدث. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("too many requests to count events")) {
    return "لقد تجاوزت الحد المسموح به. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("too many requests to list events")) {
    return "لقد تجاوزت الحد المسموح به لجلب قائمة الأحداث. يرجى المحاولة لاحقاً.";
  }
  if (
    lowerMsg.includes("event not found") ||
    lowerMsg.includes("no event found with this id")
  ) {
    return "لم يتم العثور على الحدث المطلوب.";
  }

  return message;
}

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

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

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchMore = useCallback(async () => {
    if (loadingRef.current) return;
    if (!hasMore) return;

    startOperation();

    const res = await EventsServices.getEvents({ limit, offset });

    if (res.kind !== "success") {
      endOperation(getArabicErrorMessage(res.message));
      return;
    }

    if (!res.data) {
      endOperation("حدث خطأ أثناء تحميل الأحداث");
      return;
    }

    setHasMore(Boolean(res.data.hasMore));
    setEvents((prev) => [...prev, ...(res.data!.events || [])]);
    setOffset(res.data.offset + res.data.limit);
    endOperation();
  }, [loading, hasMore, offset]);

  const getEventsCount = useCallback(async () => {
    startOperation();
    const res = await EventsServices.getEventsCount();
    if (res.kind !== "success") {
      endOperation(getArabicErrorMessage(res.message));
      return;
    }
    endOperation();
    return res.data!.total ?? res.data!.total;
  }, []);

  return useMemo(
    () => ({
      events,
      fetchMore,
      hasMore,
      loading,
      error,
      getEventsCount,
      clearError,
    }),
    [events, fetchMore, hasMore, loading, error, getEventsCount, clearError]
  );
}
