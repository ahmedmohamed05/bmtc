import { useCallback, useRef, useState } from "react";
import NewsServices from "../services/news.services";
import type { News, TopViewedNews } from "../types/news.types";

function getArabicErrorMessage(message: string): string {
  if (!message || typeof message !== "string") return "حدث خطأ غير معروف";
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("too many requests to list news")) {
    return "لقد تجاوزت الحد المسموح به لجلب قائمة الأخبار. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("too many requests to get news count")) {
    return "لقد تجاوزت الحد المسموح به. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("too many requests to get news by id")) {
    return "لقد تجاوزت الحد المسموح به لجلب بيانات الخبر. يرجى المحاولة لاحقاً.";
  }
  if (lowerMsg.includes("news not found") || lowerMsg.includes("record not found")) {
    return "لم يتم العثور على الخبر المطلوب.";
  }

  return message;
}

export default function useNews() {
  const [news, setNews] = useState<News[]>([]);
  const [topViewedNews, setTopViewedNews] = useState<TopViewedNews[]>([]);
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
  }, [])

  const fetchMore = useCallback(async () => {
    if (loadingRef.current) return;
    if (!hasMore) return;

    startOperation();

    const res = await NewsServices.getNews({ limit, offset });

    if (res.kind !== "success") {
      endOperation(getArabicErrorMessage(res.message));
      return;
    }

    if (!res.data) {
      endOperation("حدث خطأ أثناء تحميل الأخبار");
      return;
    }

    setHasMore(res.data.hasMore);

    setNews([...news, ...res.data.news]);
    setOffset(res.data.offset + res.data.limit);
    endOperation();
  }, [news, offset, hasMore, startOperation, endOperation]);

  const getNewsCount = useCallback(async () => {
    startOperation();
    const res = await NewsServices.getNewsCount();
    if (res.kind !== "success") {
      endOperation(getArabicErrorMessage(res.message));
      return;
    }
    endOperation();
    return res.data!.count;
  }, [startOperation, endOperation]);

  const fetchTopViewed = useCallback(async () => {
    startOperation();
    const res = await NewsServices.getTopViewedNews();
    if (res.kind !== "success") {
      endOperation(getArabicErrorMessage(res.message));
      return;
    }
    if (!res.data) {
      endOperation("حدث خطأ أثناء تحميل الأخبار الأكثر مشاهدة");
      return;
    }
    setTopViewedNews(res.data.topViews);
    endOperation();
  }, [startOperation, endOperation]);

  return {
    news,
    fetchMore,
    hasMore,
    loading,
    error,
    getNewsCount,
    clearError,
    topViewedNews,
    fetchTopViewed,
  };
}
