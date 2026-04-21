import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 text-white p-4 border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="hidden lg:flex gap-6 text-sm font-medium">
          <Link to="/" className="text-white/70 hover:text-white transition-colors">الكلية التقنية الادارية - البصرة</Link>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/ai" className="flex items-center gap-1.5 text-white/70 hover:text-blue-300 transition-colors">
            <span>🤖</span>
            المساعد الذكي
          </Link>
          <span className="text-white/40">|</span>
          <span className="text-white/70">اتصل بنا</span>
          <span className="text-white/40">|</span>
          <button className="hover:text-blue-300">English</button>
        </div>
      </div>
    </nav>
  );
}
