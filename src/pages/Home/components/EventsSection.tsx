import { useEffect } from "react";
import useEvents from '../../../hooks/useEvents'

export default function EventsSection() {
  const { events, fetchMore, loading } = useEvents();

  useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 inline-block border-b-4 border-yellow-500 pb-2">
          الاحداث والفعاليات
        </h2>

        <div className="flex justify-between items-center mb-10 mt-6 max-w-6xl mx-auto" dir="ltr">
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">←</button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">→</button>
          </div>
        </div>

        {loading && events.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg border border-dashed border-gray-300 w-full rounded-2xl py-12 bg-white/50">لا توجد أحداث حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-right">
            {events.slice(0, 4).map((evt) => (
              <div key={evt.id} className="rounded-2xl overflow-hidden shadow-lg group border border-gray-100 flex flex-col h-64 bg-gray-50 relative transform hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-0 z-0 bg-gray-200">
                  {evt.images && evt.images[0] && (
                    <img src={evt.images[0]} alt={evt.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10 flex flex-col justify-end p-5 text-white">
                  <h3 className="font-bold text-xl leading-tight mb-2 drop-shadow-md">
                    {evt.title}
                  </h3>
                  <p className="text-sm text-slate-50 opacity-90 drop-shadow-sm font-medium">تفاصيل الحدث</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
