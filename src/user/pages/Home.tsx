import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, type News, type Event } from "../../shared/supabase";
import {
	FiArrowRight,
	FiCalendar,
	FiFileText,
	FiBook,
	FiUsers,
} from "react-icons/fi";

export default function Home() {
	const [recentNews, setRecentNews] = useState<News[]>([]);
	const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			// Fetch recent news (last 3)
			const { data: newsData } = await supabase
				.from("news")
				.select("*")
				.order("created_at", { ascending: false })
				.limit(3);

			// Fetch upcoming events
			const { data: eventsData } = await supabase
				.from("events")
				.select("*")
				.gte("date", new Date().toISOString())
				.order("date", { ascending: true })
				.limit(3);

			setRecentNews(newsData || []);
			setUpcomingEvents(eventsData || []);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Hero Section */}
			<div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-12 text-white mb-8">
				<h1 className="text-4xl font-bold mb-4">الكلية التقنية الادارية</h1>
				<p className="text-xl opacity-90">
					Welcome to our college website. Explore our news, events, library, and
					meet our staff.
				</p>
			</div>

			{loading ? (
				<div className="text-center py-12">Loading...</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Recent News */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-2xl font-bold text-gray-900 flex items-center">
								<FiFileText className="mr-2" />
								Recent News
							</h2>
							<Link
								to="/news"
								className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
								View All
								<FiArrowRight className="ml-1" />
							</Link>
						</div>
						{recentNews.length === 0 ? (
							<p className="text-gray-500">No news available yet.</p>
						) : (
							<div className="space-y-4">
								{recentNews.map((item) => (
									<Link
										key={item.id}
										to={`/news/${item.id}`}
										className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all">
										<h3 className="font-semibold text-gray-900">
											{item.title}
										</h3>
										<p className="text-sm text-gray-600 mt-1 line-clamp-2">
											{item.content}
										</p>
										<p className="text-xs text-gray-400 mt-2">
											{new Date(item.created_at).toLocaleDateString()}
										</p>
									</Link>
								))}
							</div>
						)}
					</div>

					{/* Upcoming Events */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-2xl font-bold text-gray-900 flex items-center">
								<FiCalendar className="mr-2" />
								Upcoming Events
							</h2>
							<Link
								to="/events"
								className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
								View All
								<FiArrowRight className="ml-1" />
							</Link>
						</div>
						{upcomingEvents.length === 0 ? (
							<p className="text-gray-500">No upcoming events.</p>
						) : (
							<div className="space-y-4">
								{upcomingEvents.map((item) => (
									<div
										key={item.id}
										className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all">
										<h3 className="font-semibold text-gray-900">
											{item.title}
										</h3>
										<p className="text-sm text-gray-600 mt-1">
											{item.description}
										</p>
										<div className="mt-2 flex items-center text-xs text-gray-400">
											<FiCalendar className="mr-1" />
											{new Date(item.date).toLocaleDateString()}
											{item.location && (
												<span className="ml-4">📍 {item.location}</span>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}

			{/* Quick Links */}
			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Link
					to="/news"
					className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
					<FiFileText className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
					<h3 className="font-semibold text-gray-900">News</h3>
				</Link>
				<Link
					to="/events"
					className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
					<FiCalendar className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
					<h3 className="font-semibold text-gray-900">Events</h3>
				</Link>
				<Link
					to="/library"
					className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
					<FiBook className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
					<h3 className="font-semibold text-gray-900">Library</h3>
				</Link>
				<Link
					to="/staff"
					className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
					<FiUsers className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
					<h3 className="font-semibold text-gray-900">Staff</h3>
				</Link>
			</div>
		</div>
	);
}
