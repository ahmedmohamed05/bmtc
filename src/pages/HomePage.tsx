import { useNews } from "../hooks/useNews";
import NewsCard from "../components/NewsCard";
import { Loader, ErrorState } from "../components/Loader";
import SectionHeader from "../components/SectionHeader";
import FeatureCard from "../components/FeatureCard";
import "./HomePage.css";

const FEATURES_RIGHT = [
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
];

const FEATURES_LEFT = [
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
];

export default function HomePage() {
  const { news, loading, loadingMore, error, hasMore, loadMore } = useNews();

  return (
    <main className="flex-1">
      {/* New Hero Section with Logo */}
      <section className="hero-section">
        <div className="hero-container">
          <img
            src="/images/college-logo.png"
            alt="شعار الكلية"
            className="hero-logo"
          />
          <div className="hero-content">
            <h1 className="hero-title">الكلية التقنية الادارية</h1>
            <h2 className="hero-subtitle">ترحب بكم</h2>
            <div className="hero-line" />
            <p className="hero-description">
              نحو تعليم تقني متطور يُبني المستقبل ويؤهل الكوادر الوطنية بأعلى
              المعايير الأكاديمية والعملية.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white px-6 py-12">
        <div className="section-container">
          <SectionHeader
            title="لماذا تختار كليتنا ؟"
            subtitle="نوفر بيئة تعليمية متطورة تجمع بين النظرية والتطبيق العملي"
            centered
          />

          {/* Staggered Column Layout */}
          <div className="feature-grid">
            {/* Right Column */}
            <div className="feature-column">
              {FEATURES_RIGHT.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>

            {/* Left Column (Offset down) */}
            <div className="feature-column feature-column-offset">
              {FEATURES_LEFT.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News section */}
      <section id="news" className="px-6 py-10">
        <div className="section-container">
          <SectionHeader
            title="الأخبـار"
            linkText="عرض الكل ←"
            linkTo="/news"
          />

          {loading && <Loader />}
          {error && <ErrorState message="تعذّر تحميل الأخبار" />}
          {!loading && !error && news.length === 0 && (
            <p className="text-text-muted p-10 text-center">
              لا توجد أخبار حالياً.
            </p>
          )}

          {news.length > 0 && (
            <div className="news-grid">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="load-more-button"
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
