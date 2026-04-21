import { useEffect } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import useNews from "../../hooks/useNews";

function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("ar-IQ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatViews(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export default function NewsPage() {
  const {
    news,
    fetchMore,
    hasMore,
    loading,
    error,
    topViewedNews,
    fetchTopViewed,
  } = useNews();

  useEffect(() => {
    fetchTopViewed();
    fetchMore();
  }, [fetchTopViewed, fetchMore]);

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900 via-blue-800 to-cyan-700 z-0" />
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            الأخـبـار
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            ابقَ على اطلاع بآخر أخبار وفعاليات الكلية التقنية الادارية
          </p>
        </div>
      </section>

      {/* Top 3 Most Viewed */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              الأخبار الأكثر مشاهدة
            </h2>
          </div>

          {loading && topViewedNews.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          ) : topViewedNews.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-400 text-lg">لا توجد بيانات حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {topViewedNews.map((item, index) => (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
                >
                  {/* Rank Badge */}
                  <div className={`absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md ${
                    index === 0
                      ? "bg-gradient-to-br from-amber-400 to-amber-600"
                      : index === 1
                        ? "bg-gradient-to-br from-gray-300 to-gray-500"
                        : "bg-gradient-to-br from-orange-300 to-orange-500"
                  }`}>
                    {index + 1}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 leading-relaxed line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-100 pt-4">
                      {/* Views */}
                      <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{formatViews(item.viewsCounter)}</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              جميع الأخبار
            </h2>
          </div>

          {error && (
            <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-center text-sm">
              {error}
            </div>
          )}

          {loading && news.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          ) : news.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-400 text-lg border border-dashed border-gray-200 w-full max-w-xl rounded-2xl py-12 bg-gray-50/50 text-center">
                لا توجد أخبار حالياً
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group p-4"
                >
                  {/* Thumbnail */}
                  <div className="w-32 h-28 md:w-40 md:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {item.thumbnail_url ? (
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <h3 className="text-lg font-bold text-gray-800 leading-relaxed line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1 mb-3">
                      {item.content}
                    </p>

                    <div className="flex items-center gap-5 text-sm text-gray-400">
                      {/* Views */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{formatViews(item.viewsCounter)} مشاهدة</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={fetchMore}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        جاري التحميل...
                      </>
                    ) : (
                      "تحميل المزيد"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
