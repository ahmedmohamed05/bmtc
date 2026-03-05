import { useState, useEffect } from 'react'
import { fetchNewsItem, type NewsSafe } from '../api/news'

interface UseNewsItemState {
  item: NewsSafe | null
  loading: boolean
  error: string | null
}

export function useNewsItem(id: number): UseNewsItemState {
  const [state, setState] = useState<{
    requestId: number
    item: NewsSafe | null
    loading: boolean
    error: string | null
  }>({
    requestId: id,
    item: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    fetchNewsItem(id)
      .then((data) => {
        if (cancelled) return
        setState({
          requestId: id,
          item: data,
          loading: false,
          error: null,
        })
      })
      .catch((err: Error) => {
        if (cancelled) return
        setState({
          requestId: id,
          item: null,
          loading: false,
          error: err.message,
        })
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const waitingForCurrentId = state.requestId !== id
  return {
    item: waitingForCurrentId ? null : state.item,
    loading: waitingForCurrentId || state.loading,
    error: waitingForCurrentId ? null : state.error,
  }
}
