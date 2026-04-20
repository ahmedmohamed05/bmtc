import { useState, useEffect } from "react";
import { fetchLibraryItem, type BookSafe } from "../api/library";

interface UseLibraryItemState {
  item: BookSafe | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches one book by id.
 * A null/invalid id is handled locally to avoid making a bad network request.
 */
export function useLibraryItem(id: number | null): UseLibraryItemState {
  const [state, setState] = useState<{
    requestId: number | null;
    item: BookSafe | null;
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

    fetchLibraryItem(id)
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
    return { item: null, loading: false, error: "معرّف الكتاب غير صالح" };
  }

  const waitingForCurrentId = state.requestId !== id;
  return {
    item: waitingForCurrentId ? null : state.item,
    loading: waitingForCurrentId || state.loading,
    error: waitingForCurrentId ? null : state.error,
  };
}
