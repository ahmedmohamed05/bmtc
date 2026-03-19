import { useState, useEffect, useCallback } from 'react'
import { fetchLibraryList, type BookSafe } from '../api/library'

const LIMIT = 6

interface UseLibraryState {
  books: BookSafe[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  hasMore: boolean
  total: number
  loadMore: () => void
}

/**
 * Fetches library books incrementally for the listing page.
 */
export function useLibrary(): UseLibraryState {
  const [books, setBooks] = useState<BookSafe[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchLibraryList(LIMIT, 0)
      .then((data) => {
        if (cancelled) return
        setBooks(data.books)
        setHasMore(data.hasMore)
        setTotal(data.totalBooksLength)
        setOffset(data.books.length)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  /**
   * Requests the next page and appends it to the current list.
   */
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)

    fetchLibraryList(LIMIT, offset)
      .then((data) => {
        setBooks((prev) => [...prev, ...data.books])
        setHasMore(data.hasMore)
        setTotal(data.totalBooksLength)
        setOffset((prev) => prev + data.books.length)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoadingMore(false))
  }, [hasMore, loadingMore, offset])

  return { books, loading, loadingMore, error, hasMore, total, loadMore }
}
