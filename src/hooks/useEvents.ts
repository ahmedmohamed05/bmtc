import { useState, useEffect, useCallback } from "react";
import { fetchEventsList, type EventSafe } from "../api/events";

const LIMIT = 6;

interface UseEventsState {
  events: EventSafe[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  loadMore: () => void;
}

/**
 * Fetches public events incrementally for the listing page.
 */
export function useEvents(): UseEventsState {
  const [events, setEvents] = useState<EventSafe[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchEventsList(LIMIT, 0)
      .then((data) => {
        if (cancelled) return;
        setEvents(data.events);
        setHasMore(data.hasMore);
        setTotal(data.totalEventsLength);
        setOffset(data.events.length);
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

  /**
   * Requests the next page and appends it to the current list.
   */
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    fetchEventsList(LIMIT, offset)
      .then((data) => {
        setEvents((prev) => [...prev, ...data.events]);
        setHasMore(data.hasMore);
        setTotal(data.totalEventsLength);
        setOffset((prev) => prev + data.events.length);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoadingMore(false));
  }, [hasMore, loadingMore, offset]);

  return { events, loading, loadingMore, error, hasMore, total, loadMore };
}
