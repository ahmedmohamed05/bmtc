import { useNews } from "../hooks/useNews";
import NewsCard from "../components/NewsCard";
import { Loader, ErrorState } from "../components/Loader";

export default function NewsPage() {
  const { news, loading, loadingMore, error, hasMore, total, loadMore } =
    useNews();

  return (
    <main style={{ flex: 1, background: "var(--bg)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--blue)",
              letterSpacing: "0.5px",
            }}
          >
            الأخبار
          </h1>
          <div
            style={{
              height: 4,
              width: 50,
              background: "linear-gradient(90deg, var(--blue), var(--gold))",
              borderRadius: 2,
              marginTop: 8,
            }}
          />
          {total > 0 && (
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
              }}
            >
              إجمالي الأخبار: {total}
            </p>
          )}
        </div>

        {loading && <Loader />}
        {error && <ErrorState message="تعذّر تحميل الأخبار" />}
        {!loading && !error && news.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              padding: "3rem",
            }}
          >
            لا توجد أخبار حالياً.
          </p>
        )}

        {news.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={loadMore}
              disabled={loadingMore}
              style={{
                padding: "0.75rem 2.5rem",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg, var(--blue), #0056d4)",
                color: "#fff",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: loadingMore ? "not-allowed" : "pointer",
                opacity: loadingMore ? 0.65 : 1,
                transition: "all 0.25s ease",
                boxShadow: "0 4px 12px rgba(0, 86, 217, 0.2)",
              }}
              onMouseEnter={(e) => {
                if (!loadingMore) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0, 86, 217, 0.35)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 86, 217, 0.2)";
              }}
            >
              {loadingMore ? "جارٍ التحميل..." : "تحميل المزيد"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
