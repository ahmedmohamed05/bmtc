import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/news", label: "الأخبار" },
  { to: "/events", label: "الأحداث" },
  { to: "/library", label: "المكتبة" },
  { to: "/about", label: "عن الكلية" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "2px solid var(--blue)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo / Brand */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            color: "var(--text)",
            fontWeight: 800,
            fontSize: "1rem",
          }}
        >
          <img
            src="/logo.png"
            alt="شعار الكلية"
            style={{ height: 42 }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span>الكلية التقنية الإدارية</span>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", gap: "0.125rem" }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              style={({ isActive }) => ({
                padding: "0.4rem 1rem",
                borderRadius: 6,
                color: isActive ? "var(--blue)" : "var(--text-muted)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.9rem",
                borderBottom: isActive
                  ? "2px solid var(--blue)"
                  : "2px solid transparent",
                transition: "color 0.15s",
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--text)",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
          aria-label="القائمة"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          style={{
            background: "#fff",
            borderTop: "1px solid var(--border)",
            padding: "0.5rem 1.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
          className="mobile-nav-open"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                padding: "0.6rem 0.75rem",
                borderRadius: 6,
                color: isActive ? "var(--blue)" : "var(--text)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.9rem",
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
