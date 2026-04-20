import { useState, useEffect, useCallback } from "react";
import { fetchNewsList, type NewsSafe } from "../api/news";

const LIMIT = 6;

interface UseNewsState {
  news: NewsSafe[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  loadMore: () => void;
}

export function useNews(): UseNewsState {
  const [news, setNews] = useState<NewsSafe[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchNewsList(LIMIT, 0)
      .then((data) => {
        if (cancelled) return;
        setNews(data.news);
        setHasMore(data.hasMore);
        setTotal(data.totalNewsLength);
        setOffset(data.news.length);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    fetchNewsList(LIMIT, offset)
      .then((data) => {
        setNews((prev) => [...prev, ...data.news]);
        setHasMore(data.hasMore);
        setTotal(data.totalNewsLength);
        setOffset((prev) => prev + data.news.length);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoadingMore(false));
  }, [loadingMore, hasMore, offset]);

  return { news, loading, loadingMore, error, hasMore, total, loadMore };
}
