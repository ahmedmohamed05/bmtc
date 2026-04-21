import { Link } from "react-router-dom";
import { FaEye, FaCalendarAlt, FaImages } from "react-icons/fa";
import type { EventSafe } from "../services/events.services";
import { formatArabicDate } from "../utils/formatDate";
import { getPrimaryEventImage, getEventImageUrls } from "../utils/eventImages";

export default function EventCard({ item }: { item: EventSafe }) {
  const imageUrls = getEventImageUrls(item);
  const coverImage = getPrimaryEventImage(item);
  const imagesCount = imageUrls.length;

  return (
    <Link
      to={`/events/${item.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--bg-card)",
        border: "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow =
          "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow =
          "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)";
      }}
    >
      <div
        style={{
          position: "relative",
          paddingTop: "52%",
          background: "var(--blue-faint)",
          overflow: "hidden",
        }}
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt={item.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--blue)",
              fontSize: "2.5rem",
              fontWeight: 800,
              opacity: 0.25,
            }}
          >
            {item.title.charAt(0)}
          </div>
        )}

        {imagesCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.25rem 0.5rem",
              background: "rgba(15, 31, 48, 0.8)",
              color: "#fff",
              borderRadius: 999,
              fontSize: "0.72rem",
              fontWeight: 700,
            }}
          >
            <FaImages />
            {imagesCount}
          </span>
        )}
      </div>

      <div
        style={{
          padding: "1rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            height: 2,
            width: 32,
            background: "var(--gold)",
            borderRadius: 1,
            marginBottom: "0.25rem",
          }}
        />

        <h3
          style={{
            fontWeight: 700,
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "var(--text)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.content}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "0.25rem",
            borderTop: "1px solid var(--border)",
            paddingTop: "0.6rem",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            <FaCalendarAlt style={{ color: "var(--blue)" }} />
            {formatArabicDate(item.created_at)}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            <FaEye style={{ color: "var(--gold)" }} />
            {item.views_counter}
          </span>
        </div>
      </div>
    </Link>
  );
}
