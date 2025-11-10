import { useState } from "react";
import type { News } from "../../shared/supabase";
import { supabase } from "../../shared/supabase";

interface NewsFormProps {
	news?: News;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function NewsForm({ news, onSuccess, onCancel }: NewsFormProps) {
	const [title, setTitle] = useState(news?.title || "");
	const [content, setContent] = useState(news?.body || "");
	const [imageUrl, setImageUrl] = useState(news?.thumbnail_url || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (news) {
				// Update existing news
				const { error: updateError } = await supabase
					.from("news")
					.update({
						title,
						content,
						image_url: imageUrl || null,
						updated_at: new Date().toISOString(),
					})
					.eq("id", news.id);

				if (updateError) throw updateError;
			} else {
				// Create new news
				const { error: insertError } = await supabase.from("news").insert([
					{
						title,
						content,
						image_url: imageUrl || null,
					},
				]);

				if (insertError) throw insertError;
			}

			onSuccess();
		} catch (err: unknown) {
			setError((err as Error).message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}

			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700">
					Title
				</label>
				<input
					type="text"
					id="title"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="content"
					className="block text-sm font-medium text-gray-700">
					Content
				</label>
				<textarea
					id="content"
					required
					rows={6}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="imageUrl"
					className="block text-sm font-medium text-gray-700">
					Image URL (optional)
				</label>
				<input
					type="url"
					id="imageUrl"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div className="flex justify-end space-x-3">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
					Cancel
				</button>
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
					{loading ? "Saving..." : news ? "Update" : "Create"}
				</button>
			</div>
		</form>
	);
}
