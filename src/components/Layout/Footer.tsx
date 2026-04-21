export default function Footer() {
  return (
    <footer className="bg-sky-500 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-sm leading-relaxed text-right rtl">
          
          <div>
             <h3 className="text-xl font-bold mb-4">عن الكلية</h3>
             <p className="opacity-90">الكلية التقنية الادارية في البصرة هي مؤسسة تعليمية رائدة تقدم برامج أكاديمية متميزة في مجالات الإدارة والتقنيات الحديثة</p>
          </div>




          <div>
             <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
             <ul className="flex flex-col gap-2 opacity-90">
               <li>البصرة، العراق</li>
               <li dir="ltr" className="text-right">+964 123 4567</li>
               <li>info@atu-basra.edu.iq</li>
               <li>www.atu-basra.edu.iq</li>
             </ul>
          </div>

          <div>
             <h3 className="text-xl font-bold mb-4">ساعات العمل</h3>
             <ul className="flex flex-col gap-2 opacity-90">
               <li>الأحد - الخميس</li>
               <li>8:00 صباحاً - 2:30 مساءً</li>
               <li>الجمعة - السبت</li>
               <li>مغلق</li>
             </ul>
          </div>

        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-xs opacity-75">
          <p>© 2026 الكلية التقنية الادارية - البصرة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
