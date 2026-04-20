import { useParams, Link } from "react-router-dom";
import { FaEye, FaBook, FaChevronRight } from "react-icons/fa";
import { Loader, ErrorState } from "../components/Loader";
import { useLibraryItem } from "../hooks/useLibraryItem";
import { formatArabicDate } from "../utils/formatDate";
import ShareButton from "../components/ShareButton";

type MetadataEntry = {
  label: string;
  value: string;
};

export default function LibraryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);
  const bookId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
  const { item, loading, error } = useLibraryItem(bookId);
  const departmentName =
    item?.department?.name_ar || item?.department?.name || null;

  const metadata: MetadataEntry[] = item
    ? [
        item.major ? { label: "التخصص", value: item.major } : null,
        departmentName
          ? { label: "القسم المرتبط", value: departmentName }
          : null,
        item.print_date
          ? { label: "سنة الطباعة", value: String(item.print_date) }
          : null,
        item.book_rank
          ? { label: "ترتيب الكتاب", value: String(item.book_rank) }
          : null,
        item.row_number
          ? { label: "رقم الرف", value: String(item.row_number) }
          : null,
      ].filter((entry): entry is MetadataEntry => entry !== null)
    : [];

  return (
    <main style={{ flex: 1, background: "var(--bg)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ color: "var(--blue)" }}>
            الرئيسية
          </Link>
          <FaChevronRight style={{ fontSize: "0.65rem" }} />
          <Link to="/library" style={{ color: "var(--blue)" }}>
            المكتبة
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
          <ErrorState message="تعذّر تحميل الكتاب. ربما تم حذفه أو لم يُعثر عليه." />
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
                padding: "2rem",
                alignItems: "start",
              }}
            >
              <div style={{ width: "100%", maxWidth: 300 }}>
                {item.cover_url ? (
                  <img
                    src={item.cover_url}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 6,
                      objectFit: "cover",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "9/16",
                      background: "var(--blue-faint)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                      fontSize: "4rem",
                      color: "var(--blue)",
                      opacity: 0.25,
                    }}
                  >
                    <FaBook />
                  </div>
                )}
              </div>

              <div>
                <div style={{ marginBottom: "1.5rem" }}>
                  {departmentName && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginBottom: "0.85rem",
                        padding: "0.28rem 0.8rem",
                        borderRadius: 999,
                        background: "rgba(116, 195, 226, 0.16)",
                        color: "var(--blue-dark)",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                    >
                      {departmentName}
                    </div>
                  )}

                  <h1
                    style={{
                      margin: 0,
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "var(--text)",
                      marginBottom: "0.5rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h1>

                  <p
                    style={{
                      margin: "0 0 1rem",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>المؤلف:</span>{" "}
                    {item.author}
                  </p>

                  {item.major && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.92rem",
                        color: "var(--gold-dark)",
                        fontWeight: 700,
                      }}
                    >
                      {item.major}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.25rem 2rem",
                    marginBottom: "1.5rem",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <FaEye
                      style={{ fontSize: "0.9rem", color: "var(--blue)" }}
                    />
                    <span>{item.views_counter}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "var(--text)" }}>
                      آخر تحديث:
                    </span>
                    <time>{formatArabicDate(item.updated_at)}</time>
                  </div>
                </div>

                {metadata.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "0.85rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {metadata.map((entry) => (
                      <div
                        key={entry.label}
                        style={{
                          padding: "0.85rem 1rem",
                          borderRadius: 10,
                          background: "#f8fafc",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 0.2rem",
                            color: "var(--text-muted)",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          {entry.label}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text)",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                          }}
                        >
                          {entry.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginBottom: "1.5rem" }}>
                  <ShareButton title={item.title} text={item.description} />
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "0 2rem 2rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <h2
                style={{
                  margin: "1rem 0 0.75rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                وصف الكتاب
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {item.description}
              </p>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
