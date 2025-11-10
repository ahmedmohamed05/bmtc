import { useState } from "react";
import { supabase } from "../../shared/supabase";

interface BookFormProps {
	book?: Book;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function BookForm({ book, onSuccess, onCancel }: BookFormProps) {
	const [title, setTitle] = useState(book?.title || "");
	const [author, setAuthor] = useState(book?.author || "");
	const [isbn, setIsbn] = useState(book?.isbn || "");
	const [description, setDescription] = useState(book?.description || "");
	const [coverUrl, setCoverUrl] = useState(book?.cover_url || "");
	const [available, setAvailable] = useState(book?.available ?? true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (book) {
				const { error: updateError } = await supabase
					.from("books")
					.update({
						title,
						author,
						isbn: isbn || null,
						description: description || null,
						cover_url: coverUrl || null,
						available,
						updated_at: new Date().toISOString(),
					})
					.eq("id", book.id);

				if (updateError) throw updateError;
			} else {
				const { error: insertError } = await supabase.from("books").insert([
					{
						title,
						author,
						isbn: isbn || null,
						description: description || null,
						cover_url: coverUrl || null,
						available,
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
					Title *
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
					htmlFor="author"
					className="block text-sm font-medium text-gray-700">
					Author *
				</label>
				<input
					type="text"
					id="author"
					required
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="isbn"
					className="block text-sm font-medium text-gray-700">
					ISBN (optional)
				</label>
				<input
					type="text"
					id="isbn"
					value={isbn}
					onChange={(e) => setIsbn(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700">
					Description (optional)
				</label>
				<textarea
					id="description"
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="coverUrl"
					className="block text-sm font-medium text-gray-700">
					Cover Image URL (optional)
				</label>
				<input
					type="url"
					id="coverUrl"
					value={coverUrl}
					onChange={(e) => setCoverUrl(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div className="flex items-center">
				<input
					type="checkbox"
					id="available"
					checked={available}
					onChange={(e) => setAvailable(e.target.checked)}
					className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
				/>
				<label htmlFor="available" className="ml-2 block text-sm text-gray-900">
					Available
				</label>
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
					{loading ? "Saving..." : book ? "Update" : "Create"}
				</button>
			</div>
		</form>
	);
}
