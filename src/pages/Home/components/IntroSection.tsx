export default function IntroSection() {
  const features = [
    { title: "كادر تدريسي متميز", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" },
    { title: "مختبرات حديثة", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
    { title: "تدريب عملي", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" },
    { title: "مناهج متطورة", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className="py-20 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          مرحبا بكم في الكلية التقنية الادارية - البصرة
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-20 leading-relaxed text-lg">
          نحن نقدم تعليماً متميزاً في مجالات الإدارة والتقنيات الحديثة، ونعمل على تأهيل الكوادر المهنية القادرة على المنافسة في سوق العمل المحلي والعالمي.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 inline-block border-b-4 border-blue-400 pb-2">
          لماذا تختار كليتنا ؟
        </h3>
        <p className="text-gray-500 mb-12">
          تقدم بيئة تعليمية متطورة تجمع بين النظرية والتطبيق العملي
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {features.map((feature, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all duration-300">
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-900/90 via-blue-900/40 to-transparent"></div>
              <h4 className="absolute bottom-6 left-0 right-0 text-white font-bold text-xl px-4 text-center">
                {feature.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
