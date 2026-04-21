import { Link } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import { useStats } from "../hooks/useStats";
import NewsCard from "../components/NewsCard";
import { Loader, ErrorState } from "../components/Loader";

export default function HomePage() {
  const { news, loading, loadingMore, error, hasMore, loadMore } = useNews();
  const { stats, loading: statsLoading } = useStats();

  return (
    <main style={{ flex: 1 }}>
      {/* New Hero Section with Logo */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #fff 0%, var(--blue-faint) 100%)",
          padding: "4rem 1.5rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
            textAlign: "right",
          }}
        >
          <img
            src="/images/college-logo.png"
            alt="شعار الكلية"
            style={{
              height: "clamp(120px, 15vw, 180px)",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                fontWeight: 900,
                color: "var(--blue)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              الكلية التقنية الادارية
            </h1>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                fontWeight: 600,
                color: "var(--gold)",
                margin: 0,
                opacity: 0.9,
              }}
            >
              ترحب بكم
            </h2>
            <div
              style={{
                height: 4,
                width: 80,
                background: "var(--gold)",
                borderRadius: 2,
                marginTop: "1rem",
                marginRight: 0,
              }}
            />
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-muted)",
                maxWidth: 450,
                marginTop: "1.5rem",
                lineHeight: 1.8,
              }}
            >
              نحو تعليم تقني متطور يُبني المستقبل ويؤهل الكوادر الوطنية بأعلى
              المعايير الأكاديمية والعملية.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section style={{ background: "#fff", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                fontWeight: 800,
                color: "var(--blue)",
                letterSpacing: "0.5px",
              }}
            >
              لماذا تختار كليتنا ؟
            </h2>
            <div
              style={{
                height: 4,
                width: 60,
                background: "linear-gradient(90deg, var(--blue), var(--gold))",
                borderRadius: 2,
                margin: "0.75rem auto 0.75rem",
              }}
            />
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
              نوفر بيئة تعليمية متطورة تجمع بين النظرية والتطبيق العملي
            </p>
          </div>

          {/* Staggered Column Layout */}
          <div style={{ display: "flex", gap: "2rem" }}>
            {/* Right Column */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              {[
                {
                  img: "/images/Image 1.png",
                  title: "مختبرات حديثة",
                  desc: "مرافق تعليمية مجهزة بأحدث التقنيات والأجهزة لتطبيق المهارات العملية",
                  hue: "195deg",
                },
                {
                  img: "/images/Image 1.png",
                  title: "مناهج متطورة",
                  desc: "برامج دراسية محدّثة تواكب أحدث التطورات في مجالات الإدارة والتكنولوجيا",
                  hue: "215deg",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 12,
                      overflow: "hidden",
                      aspectRatio: "1.4",
                      background: `hsl(${f.hue} 70% 35%)`,
                      boxShadow: "0 10px 40px -12px rgba(0,0,0,0.3)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 20px 50px -15px rgba(0,0,0,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 10px 40px -12px rgba(0,0,0,0.3)";
                    }}
                  >
                    <img
                      src={f.img}
                      alt={f.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(1,100,170,0.92) 0%, rgba(1,140,200,0.3) 60%, transparent 100%)",
                      }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        bottom: "1.2rem",
                        left: "1.2rem",
                        right: "1.2rem",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                        lineHeight: 1.2,
                        textAlign: "right",
                      }}
                    >
                      {f.title}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      paddingRight: "0.5rem",
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Left Column (Offset down) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
                marginTop: "5rem",
              }}
            >
              {[
                {
                  img: "/images/Image 1.png",
                  title: "كادر تدريسي متميز",
                  desc: "فريق من الأكاديميين والخبراء المتخصصين في مجالات الإدارة والتقنيات الحديثة",
                  hue: "205deg",
                },
                {
                  img: "/images/Image 1.png",
                  title: "تدريب عملي",
                  desc: "برامج تدريبية في أفضل الشركات والمؤسسات لضمان جاهزية الخريجين لسوق العمل",
                  hue: "185deg",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 12,
                      overflow: "hidden",
                      aspectRatio: "1.4",
                      background: `hsl(${f.hue} 70% 35%)`,
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src={f.img}
                      alt={f.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(1,100,170,0.92) 0%, rgba(1,140,200,0.3) 60%, transparent 100%)",
                      }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        bottom: "1.2rem",
                        left: "1.2rem",
                        right: "1.2rem",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                        lineHeight: 1.2,
                        textAlign: "right",
                      }}
                    >
                      {f.title}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      paddingRight: "0.5rem",
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics section */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--blue-faint, #f4f8fb)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                fontWeight: 800,
                color: "var(--blue)",
                letterSpacing: "0.5px",
              }}
            >
              إحصائيات الكلية
            </h2>
            <div
              style={{
                height: 4,
                width: 60,
                background: "linear-gradient(90deg, var(--blue), var(--gold))",
                borderRadius: 2,
                margin: "0.75rem auto 0.75rem",
              }}
            />
          </div>

          {statsLoading ? (
            <Loader />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {[
                { label: "الأقسام", value: stats.departments?.total?.total || 0, icon: "🏢", hue: "205deg" },
                { label: "النشاطات والفعاليات", value: stats.events?.total || 0, icon: "📅", hue: "185deg" },
                { label: "الأخبار", value: stats.newsTotal || 0, icon: "📰", hue: "195deg" },
                { label: "الكتب والمراجع", value: stats.booksTotal || 0, icon: "📚", hue: "215deg" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "2rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px -15px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.08)";
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: `hsl(${stat.hue} 70% 95%)`,
                      color: `hsl(${stat.hue} 70% 40%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: "var(--blue)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textAlign: "center",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News section */}
      <section id="news" style={{ padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "var(--blue)",
                  letterSpacing: "0.5px",
                }}
              >
                الأخبـار
              </h2>
              <div
                style={{
                  height: 4,
                  width: 50,
                  background:
                    "linear-gradient(90deg, var(--blue), var(--gold))",
                  borderRadius: 2,
                  marginTop: 6,
                }}
              />
            </div>
            <Link
              to="/news"
              style={{
                fontSize: "0.82rem",
                color: "var(--blue)",
                fontWeight: 600,
              }}
            >
              عرض الكل ←
            </Link>
          </div>

          {loading && <Loader />}
          {error && <ErrorState message="تعذّر تحميل الأخبار" />}
          {!loading && !error && news.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                padding: "2.5rem",
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
                  padding: "0.6rem 2rem",
                  borderRadius: 6,
                  border: "1.5px solid var(--blue)",
                  background: "transparent",
                  color: "var(--blue)",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: loadingMore ? "not-allowed" : "pointer",
                  opacity: loadingMore ? 0.6 : 1,
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!loadingMore) {
                    e.currentTarget.style.background = "var(--blue)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--blue)";
                }}
              >
                {loadingMore ? "جارٍ التحميل..." : "تحميل المزيد"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
