import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEye, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import { Loader, ErrorState } from "../components/Loader";
import { useEventItem } from "../hooks/useEventItem";
import { formatArabicDate } from "../utils/formatDate";
import { getEventImageUrls } from "../utils/eventImages";
import ShareButton from "../components/ShareButton";

/**
 * Keeps the selected index within the available images bounds.
 */
function clampImageIndex(index: number, imageCount: number): number {
  if (imageCount <= 0) return 0;
  return Math.min(Math.max(index, 0), imageCount - 1);
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);
  const eventId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
  const { item, loading, error } = useEventItem(eventId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const imageUrls = useMemo(() => {
    if (!item) return [];
    return getEventImageUrls(item);
  }, [item]);

  const selectedImage =
    imageUrls[clampImageIndex(activeImageIndex, imageUrls.length)];

  return (
    <main style={{ flex: 1, background: "var(--bg)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
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
          <Link to="/events" style={{ color: "var(--blue)" }}>
            الفعاليات
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
          <ErrorState message="تعذّر تحميل الفعالية. ربما تم حذفها أو لم يُعثر عليها." />
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
            {selectedImage ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0.5rem",
                  background: "#f8fafc",
                }}
              >
                <img
                  src={selectedImage}
                  alt={item.title}
                  style={{
                    width: "auto",
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "70vh",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  height: 190,
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

            {imageUrls.length > 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
                  gap: "0.6rem",
                  padding: "0.85rem 0.85rem 0",
                  background: "#fff",
                }}
              >
                {imageUrls.map((url, index) => (
                  <button
                    key={`${url}-${index}`}
                    onClick={() => setActiveImageIndex(index)}
                    style={{
                      border:
                        index === activeImageIndex
                          ? "2px solid var(--blue)"
                          : "1px solid var(--border)",
                      borderRadius: 6,
                      padding: 0,
                      overflow: "hidden",
                      cursor: "pointer",
                      opacity: index === activeImageIndex ? 1 : 0.75,
                    }}
                    aria-label={`صورة الفعالية رقم ${index + 1}`}
                    type="button"
                  >
                    <img
                      src={url}
                      alt={`${item.title} ${index + 1}`}
                      style={{
                        width: "100%",
                        height: 64,
                        objectFit: "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            <div style={{ padding: "1.75rem 2rem" }}>
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
                  url={`${window.location.origin}/events/${item.id}`}
                />
              </div>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--border)",
                  marginBottom: "1.5rem",
                }}
              />

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
