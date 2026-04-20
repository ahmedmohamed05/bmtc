import { useState, useEffect } from "react";
import { fetchEventItem, type EventSafe } from "../api/events";

interface UseEventItemState {
  item: EventSafe | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches one event by id.
 * A null/invalid id is handled locally to avoid making a bad network request.
 */
export function useEventItem(id: number | null): UseEventItemState {
  const [state, setState] = useState<{
    requestId: number | null;
    item: EventSafe | null;
    loading: boolean;
    error: string | null;
  }>({
    requestId: id,
    item: null,
    loading: id !== null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    if (id === null) return;

    fetchEventItem(id)
      .then((data) => {
        if (cancelled) return;
        setState({
          requestId: id,
          item: data,
          loading: false,
          error: null,
        });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState({
          requestId: id,
          item: null,
          loading: false,
          error: err.message,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (id === null) {
    return { item: null, loading: false, error: "معرّف الفعالية غير صالح" };
  }

  const waitingForCurrentId = state.requestId !== id;
  return {
    item: waitingForCurrentId ? null : state.item,
    loading: waitingForCurrentId || state.loading,
    error: waitingForCurrentId ? null : state.error,
  };
}
