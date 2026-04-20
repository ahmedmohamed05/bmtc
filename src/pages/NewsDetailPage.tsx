import { useParams, Link } from "react-router-dom";
import { FaEye, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import { useNewsItem } from "../hooks/useNewsItem";
import { Loader, ErrorState } from "../components/Loader";
import { formatArabicDate } from "../utils/formatDate";
import ShareButton from "../components/ShareButton";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { item, loading, error } = useNewsItem(Number(id));

  return (
    <main style={{ flex: 1, background: "var(--bg)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: "1.25rem",
          }}
        >
          <Link to="/" style={{ color: "var(--blue)" }}>
            الرئيسية
          </Link>
          <FaChevronRight style={{ fontSize: "0.65rem" }} />
          <Link to="/news" style={{ color: "var(--blue)" }}>
            الأخبار
          </Link>
          {item && (
            <>
              <FaChevronRight style={{ fontSize: "0.65rem" }} />
              <span
                style={{
                  color: "var(--text-muted)",
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </span>
            </>
          )}
        </nav>

        {loading && <Loader />}
        {error && (
          <ErrorState message="تعذّر تحميل الخبر. ربما تم حذفه أو لم يُعثر عليه." />
        )}

        {item && (
          <article
            style={{
              background: "#fff",
              borderRadius: 8,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            {/* Thumbnail */}
            {item.thumbnail_url ? (
              <img
                src={item.thumbnail_url}
                alt={item.title}
                style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  height: 160,
                  background: "var(--blue-faint)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  color: "var(--blue)",
                  opacity: 0.2,
                  fontWeight: 800,
                }}
              >
                {item.title.charAt(0)}
              </div>
            )}

            <div style={{ padding: "1.75rem 2rem" }}>
              {/* Gold accent */}
              <div
                style={{
                  height: 4,
                  width: 50,
                  background:
                    "linear-gradient(90deg, var(--blue), var(--gold))",
                  borderRadius: 2,
                  marginBottom: "1.25rem",
                }}
              />

              {/* Title */}
              <h1
                style={{
                  fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)",
                  fontWeight: 800,
                  color: "var(--text)",
                  lineHeight: 1.5,
                  marginBottom: "0.75rem",
                }}
              >
                {item.title}
              </h1>

              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <FaCalendarAlt style={{ color: "var(--blue)" }} />
                  {formatArabicDate(item.created_at)}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <FaEye style={{ color: "var(--gold)" }} />
                  {item.views_counter} مشاهدة
                </span>
                <ShareButton
                  title={item.title}
                  text={item.content.slice(0, 140)}
                  url={`${window.location.origin}/news/${item.id}`}
                />
              </div>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--border)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Content */}
              <div
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 2.1,
                  color: "var(--text)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.content}
              </div>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
