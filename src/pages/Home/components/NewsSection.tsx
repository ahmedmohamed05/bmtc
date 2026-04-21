import { useEffect } from "react";
import useNews from "../../../hooks/useNews";

export default function NewsSection() {
  const { news, fetchMore, loading } = useNews();

  useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 inline-block border-b-4 border-blue-600 pb-2">
          الاخـــبار
        </h2>
        
        <div className="flex justify-between items-center mb-10 mt-6 max-w-6xl mx-auto" dir="ltr">
           <div className="hidden md:flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">←</button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">→</button>
           </div>
        </div>

        {loading && news.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        ) : news.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg border border-dashed border-gray-300 w-full rounded-2xl py-12 bg-white/50">لا توجد أخبار حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-right">
            {news.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-2xl overflow-hidden shadow-lg group border border-gray-100 flex flex-col h-64 bg-gray-50 relative transform hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-0 z-0 bg-gray-200">
                  {item.thumbnail_url && (
                    <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-cyan-900/90 via-cyan-900/40 to-transparent z-10 flex flex-col justify-end p-5 text-white">
                   <h3 className="font-bold text-xl leading-tight mb-2 drop-shadow-md">
                      {item.title}
                   </h3>
                   <p className="text-sm text-cyan-50 opacity-90 drop-shadow-sm font-medium">تفاصيل الخبر</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
