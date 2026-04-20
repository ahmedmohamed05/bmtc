import { useState } from "react";
import { FaShareAlt, FaCheck } from "react-icons/fa";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

/**
 * Shares content using the platform share sheet when available.
 * Falls back to copying the URL to clipboard.
 */
export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url ?? window.location.href;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: shareUrl });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.35rem 0.65rem",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: copied ? "var(--blue-faint)" : "#fff",
        color: copied ? "var(--blue)" : "var(--text-muted)",
        fontFamily: "inherit",
        fontWeight: 700,
        fontSize: "0.78rem",
        cursor: "pointer",
      }}
      aria-label="مشاركة"
    >
      {copied ? <FaCheck style={{ color: "var(--blue)" }} /> : <FaShareAlt />}
      {copied ? "تم النسخ" : "مشاركة"}
    </button>
  );
}
