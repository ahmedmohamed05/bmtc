import { useState, useEffect } from "react";
import { fetchDepartmentsCount, type DepartmentCounts } from "../services/departments";
import { fetchEventsCount, type EventsCount } from "../services/events.services";
import { fetchNewsCount } from "../services/news.services";
import { fetchLibraryCount } from "../services/library";

export interface AppStats {
  departments: DepartmentCounts | null;
  events: EventsCount | null;
  newsTotal: number | null;
  booksTotal: number | null;
}

export function useStats() {
  const [stats, setStats] = useState<AppStats>({
    departments: null,
    events: null,
    newsTotal: null,
    booksTotal: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAllStats() {
      try {
        setLoading(true);
        setError(null);

        // Fetching actual count endpoints
        const [deptRes, eventsRes, newsRes, libRes] = await Promise.allSettled([
          fetchDepartmentsCount(),
          fetchEventsCount(),
          fetchNewsCount(),
          fetchLibraryCount(),
        ]);

        if (!isMounted) return;

        setStats({
          departments: deptRes.status === "fulfilled" ? deptRes.value : null,
          events: eventsRes.status === "fulfilled" ? eventsRes.value : null,
          newsTotal: newsRes.status === "fulfilled" ? newsRes.value.count : null,
          booksTotal: libRes.status === "fulfilled" ? libRes.value.count : null,
        });
      } catch (err: any) {
        if (isMounted) setError(err.message || "فشل في تحميل الإحصائيات");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAllStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, loading, error };
}
