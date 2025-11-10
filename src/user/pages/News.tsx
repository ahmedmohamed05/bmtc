import { useEffect, useState } from "react";
import { supabase, News } from "../../shared/supabase";

export default function NewsPage() {
	const [news, setNews] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		try {
			const { data, error } = await supabase
				.from("news")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;
			setNews(data || []);
		} catch (error) {
			console.error("Error fetching news:", error);
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

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">News</h1>

			{news.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-12 text-center">
					<p className="text-gray-500 text-lg">
						No news articles available yet.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{news.map((item) => (
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
								<h2 className="text-xl font-semibold text-gray-900 mb-2">
									{item.title}
								</h2>
								<p className="text-gray-600 line-clamp-3 mb-4">
									{item.content}
								</p>
								<p className="text-xs text-gray-400">
									{new Date(item.created_at).toLocaleDateString()}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
