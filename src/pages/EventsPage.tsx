import EventCard from "../components/EventCard";
import { Loader, ErrorState } from "../components/Loader";
import { useEvents } from "../hooks/useEvents";

export default function EventsPage() {
	const { events, loading, loadingMore, error, hasMore, total, loadMore } =
		useEvents();

	return (
		<main style={{ flex: 1, background: "var(--bg)", padding: "2rem 1.5rem" }}>
			<div style={{ maxWidth: 1100, margin: "0 auto" }}>
				<div style={{ marginBottom: "1.75rem" }}>
					<h1
						style={{
							fontSize: "1.5rem",
							fontWeight: 800,
							color: "var(--text)",
						}}>
						الفعاليات
					</h1>
					<div
						style={{
							height: 3,
							width: 44,
							background: "var(--gold)",
							borderRadius: 2,
							marginTop: 5,
						}}
					/>
					{total > 0 && (
						<p
							style={{
								marginTop: "0.5rem",
								fontSize: "0.82rem",
								color: "var(--text-muted)",
							}}>
							إجمالي الفعاليات: {total}
						</p>
					)}
				</div>

				{loading && <Loader />}
				{error && <ErrorState message="تعذّر تحميل الفعاليات" />}
				{!loading && !error && events.length === 0 && (
					<p
						style={{
							textAlign: "center",
							color: "var(--text-muted)",
							padding: "3rem",
						}}>
						لا توجد فعاليات حالياً.
					</p>
				)}

				{events.length > 0 && (
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
							gap: "1.25rem",
						}}>
						{events.map((item) => (
							<EventCard key={item.id} item={item} />
						))}
					</div>
				)}

				{hasMore && (
					<div style={{ textAlign: "center", marginTop: "2rem" }}>
						<button
							onClick={loadMore}
							disabled={loadingMore}
							style={{
								padding: "0.6rem 2rem",
								borderRadius: 6,
								border: "1.5px solid var(--blue)",
								background: "transparent",
								color: "var(--blue)",
								fontFamily: "inherit",
								fontWeight: 700,
								fontSize: "0.9rem",
								cursor: loadingMore ? "not-allowed" : "pointer",
								opacity: loadingMore ? 0.6 : 1,
								transition: "background 0.15s, color 0.15s",
							}}
							onMouseEnter={(e) => {
								if (!loadingMore) {
									e.currentTarget.style.background = "var(--blue)";
									e.currentTarget.style.color = "#fff";
								}
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
								e.currentTarget.style.color = "var(--blue)";
							}}>
							{loadingMore ? "جارٍ التحميل..." : "تحميل المزيد"}
						</button>
					</div>
				)}
			</div>
		</main>
	);
}
