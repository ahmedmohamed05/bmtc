import { useState, useEffect } from "react";
import { supabase, type News } from "../../shared/supabase";
import NewsForm from "../components/NewsForm";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import type { UUID } from "../../types";

export default function NewsPage() {
	const [news, setNews] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingNews, setEditingNews] = useState<News | undefined>();
	const [showForm, setShowForm] = useState(false);

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
			console.error("خطأ اثناء جلب الأخبار", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: UUID) => {
		// if (!confirm("Are you sure you want to delete this news article?")) return;
		// try {
		// 	const { error } = await supabase.from("news").delete().eq("id", id);
		// 	if (error) throw error;
		// 	fetchNews();
		// } catch (error) {
		// 	console.error("Error deleting news:", error);
		// 	alert("Failed to delete news article");
		// }
		console.log(id);
	};

	const handleEdit = (item: News) => {
		// setEditingNews(item);
		// setShowForm(true);
		console.log(item);
	};

	const handleFormSuccess = () => {
		// setShowForm(false);
		// setEditingNews(undefined);
		fetchNews();
	};

	const handleCancel = () => {
		setShowForm(false);
		setEditingNews(undefined);
	};

	if (loading) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<div className="px-4 py-6 sm:px-0">
			<div className="container">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-900">أدارة الأخبار</h1>
					{!showForm && (
						<button
							onClick={() => setShowForm(true)}
							className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
							أضافة خبر جديد
							<FiPlus className="mr-2" />
						</button>
					)}
				</div>
				{showForm ? (
					<div className="bg-white shadow rounded-lg p-6 mb-6">
						<NewsForm
							news={editingNews}
							onSuccess={handleFormSuccess}
							onCancel={handleCancel}
						/>
					</div>
				) : null}
				<div className="bg-white shadow overflow-hidden sm:rounded-md">
					<ul className="divide-y divide-gray-200">
						{news.length === 0 ? (
							<li className="px-6 py-8 text-center text-gray-500">
								لا توجد أخبار حتى الأن، اضغط أضافة خبر جديد للأضافة
							</li>
						) : (
							news.map((item) => (
								<li key={item.id} className="px-6 py-4">
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<h3 className="text-lg font-medium text-gray-900">
												{item.title}
											</h3>
											<p className="mt-1 text-sm text-gray-500 line-clamp-2">
												{item.body}
											</p>
											<p className="mt-1 text-xs text-gray-400">
												{new Date(item.created_at).toLocaleDateString()}
											</p>
										</div>
										<div className="ml-4 flex space-x-2">
											<button
												onClick={() => handleEdit(item)}
												className="text-indigo-600 hover:text-indigo-900">
												<FiEdit className="h-5 w-5" />
											</button>
											<button
												onClick={() => handleDelete(item.id)}
												className="text-red-600 hover:text-red-900">
												<FiTrash2 className="h-5 w-5" />
											</button>
										</div>
									</div>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
