export function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: "4px solid var(--border)",
          borderTopColor: "var(--blue-mid)",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1rem",
        color: "var(--text-muted)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span style={{ fontSize: "2.5rem" }}>⚠️</span>
      <p style={{ fontSize: "0.95rem" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: 8,
            border: "none",
            background: "var(--blue-mid)",
            color: "#fff",
            fontFamily: "inherit",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
