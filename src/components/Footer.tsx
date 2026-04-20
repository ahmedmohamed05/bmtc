import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--footer-bg)",
        color: "var(--footer-text)",
        marginTop: "auto",
        padding: "2.5rem 1.5rem 1.25rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* About */}
        <div>
          <h3
            style={{
              color: "#fff",
              fontWeight: 700,
              marginBottom: "0.75rem",
              fontSize: "0.95rem",
              borderBottom: "1px solid var(--blue)",
              paddingBottom: "0.4rem",
            }}
          >
            عن الكلية
          </h3>
          <p style={{ fontSize: "0.83rem", lineHeight: 1.9, opacity: 0.75 }}>
            الكلية التقنية الإدارية – البصرة، تُعنى بتأهيل الكوادر الإدارية
            والتقنية وتنمية المهارات المهنية.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3
            style={{
              color: "#fff",
              fontWeight: 700,
              marginBottom: "0.75rem",
              fontSize: "0.95rem",
              borderBottom: "1px solid var(--blue)",
              paddingBottom: "0.4rem",
            }}
          >
            روابط سريعة
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
            }}
          >
            {[
              { to: "/", label: "الرئيسية" },
              { to: "/news", label: "الأخبار" },
              { to: "/about", label: "عن الكلية" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  style={{
                    fontSize: "0.83rem",
                    opacity: 0.75,
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            style={{
              color: "#fff",
              fontWeight: 700,
              marginBottom: "0.75rem",
              fontSize: "0.95rem",
              borderBottom: "1px solid var(--blue)",
              paddingBottom: "0.4rem",
            }}
          >
            معلومات الاتصال
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {[
              { icon: <FaMapMarkerAlt />, text: "البصرة، العراق" },
              { icon: <FaPhoneAlt />, text: "07700000000" },
              { icon: <FaEnvelope />, text: "info@bmtc.edu.iq" },
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.83rem",
                  opacity: 0.75,
                }}
              >
                <span style={{ color: "var(--gold)" }}>{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3
            style={{
              color: "#fff",
              fontWeight: 700,
              marginBottom: "0.75rem",
              fontSize: "0.95rem",
              borderBottom: "1px solid var(--blue)",
              paddingBottom: "0.4rem",
            }}
          >
            ساعات العمل
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
            }}
          >
            {[
              { day: "الأحد – الخميس", hours: "8:00 ص – 4:00 م" },
              { day: "الجمعة – السبت", hours: "مغلق" },
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "0.83rem",
                  opacity: 0.75,
                }}
              >
                <FaClock
                  style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }}
                />
                <span>
                  {item.day}: {item.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "1.75rem auto 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "1rem",
          textAlign: "center",
          fontSize: "0.78rem",
          opacity: 0.45,
        }}
      >
        © {new Date().getFullYear()} الكلية التقنية الإدارية – البصرة. جميع
        الحقوق محفوظة.
      </div>
    </footer>
  );
}
