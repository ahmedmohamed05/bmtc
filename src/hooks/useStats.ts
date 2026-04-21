import { useState, useEffect } from "react";
import DepartmentsServices from "../services/departments.services";
import type { DepartmentCountResponse } from "../types/departments.types";
import EventsServices from "../services/events.services";
import type { EventCountResponse } from "../types/events.types";
import NewsServices from "../services/news.services";
import { fetchLibraryCount } from "../services/library";

export interface AppStats {
  departments: DepartmentCountResponse | null;
  events: EventCountResponse | null;
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
          DepartmentsServices.getDepartmentsCount(),
          EventsServices.getEventsCount(),
          NewsServices.getNewsCount(),
          fetchLibraryCount(),
        ]);

        if (!isMounted) return;

        setStats({
          departments: deptRes.status === "fulfilled" && deptRes.value.kind === "success" ? deptRes.value.data : null,
          events: eventsRes.status === "fulfilled" && eventsRes.value.kind === "success" ? eventsRes.value.data : null,
          newsTotal: newsRes.status === "fulfilled" && newsRes.value.kind === "success" ? newsRes.value.data?.count ?? null : null,
          booksTotal: libRes.status === "fulfilled" && 'count' in libRes.value ? libRes.value.count : null,
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
