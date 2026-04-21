import { useEffect } from "react";
import useDepartments from "../../../hooks/useDepartments";

export default function DepartmentsSection() {
  const { departments, fetchAll, loading } = useDepartments();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Sort or pick a few departments if needed.
  // The design shows list of departments like:
  // قسم ادارة الاعمال, قسم تقنيات المعلومات ...

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 inline-block border-b-4 border-blue-400 pb-2">
          الأقسام الأكاديمية
        </h2>
        <p className="text-gray-500 mb-16 mt-4">
          تعرف على تخصصاتنا المتميزة
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors mx-auto">
                   {/* Icon Placeholder */}
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                   </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{dept.nameAr || dept.name}</h3>
                {dept.description && (
                  <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                    {dept.description}
                  </p>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
