import { useEffect, useState } from "react";
import { supabase, type Event } from "../../shared/supabase";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function EventsPage() {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const { data, error } = await supabase
				.from("events")
				.select("*")
				.order("date", { ascending: true });

			if (error) throw error;
			setEvents(data || []);
		} catch (error) {
			console.error("Error fetching events:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center py-12">Loading...</div>
			</div>
		);
	}

	const now = new Date();
	const upcomingEvents = events.filter((e) => new Date(e.date) >= now);
	const pastEvents = events.filter((e) => new Date(e.date) < now);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">Events</h1>

			{events.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-12 text-center">
					<p className="text-gray-500 text-lg">No events available yet.</p>
				</div>
			) : (
				<>
					{upcomingEvents.length > 0 && (
						<div className="mb-12">
							<h2 className="text-2xl font-semibold text-gray-900 mb-6">
								Upcoming Events
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{upcomingEvents.map((item) => (
									<div
										key={item.id}
										className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
										{item.image_url && (
											<img
												src={item.image_url}
												alt={item.title}
												className="w-full h-48 object-cover"
											/>
										)}
										<div className="p-6">
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												{item.title}
											</h3>
											<p className="text-gray-600 mb-4">{item.description}</p>
											<div className="space-y-2 text-sm text-gray-500">
												<div className="flex items-center">
													<FiCalendar className="mr-2" />
													{new Date(item.date).toLocaleDateString("en-US", {
														weekday: "long",
														year: "numeric",
														month: "long",
														day: "numeric",
													})}
												</div>
												{item.location && (
													<div className="flex items-center">
														<FiMapPin className="mr-2" />
														{item.location}
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{pastEvents.length > 0 && (
						<div>
							<h2 className="text-2xl font-semibold text-gray-900 mb-6">
								Past Events
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{pastEvents.map((item) => (
									<div
										key={item.id}
										className="bg-white rounded-lg shadow-md overflow-hidden opacity-75">
										{item.image_url && (
											<img
												src={item.image_url}
												alt={item.title}
												className="w-full h-48 object-cover"
											/>
										)}
										<div className="p-6">
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												{item.title}
											</h3>
											<p className="text-gray-600 mb-4">{item.description}</p>
											<div className="space-y-2 text-sm text-gray-500">
												<div className="flex items-center">
													<FiCalendar className="mr-2" />
													{new Date(item.date).toLocaleDateString()}
												</div>
												{item.location && (
													<div className="flex items-center">
														<FiMapPin className="mr-2" />
														{item.location}
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
