import { useEffect, useState } from "react";
import { supabase, Book } from "../../shared/supabase";
import { FiBook } from "react-icons/fi";

export default function LibraryPage() {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			const { data, error } = await supabase
				.from("books")
				.select("*")
				.order("title", { ascending: true });

			if (error) throw error;
			setBooks(data || []);
		} catch (error) {
			console.error("Error fetching books:", error);
		} finally {
			setLoading(false);
		}
	};

	const filteredBooks = books.filter(
		(book) =>
			book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(book.isbn && book.isbn.includes(searchTerm))
	);

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center py-12">Loading...</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Library</h1>
				<div className="w-64">
					<input
						type="text"
						placeholder="Search books..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
			</div>

			{books.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-12 text-center">
					<p className="text-gray-500 text-lg">No books available yet.</p>
				</div>
			) : filteredBooks.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-12 text-center">
					<p className="text-gray-500 text-lg">
						No books found matching your search.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{filteredBooks.map((book) => (
						<div
							key={book.id}
							className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
							{book.cover_url ? (
								<img
									src={book.cover_url}
									alt={book.title}
									className="w-full h-64 object-cover"
								/>
							) : (
								<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
									<FiBook className="h-16 w-16 text-gray-400" />
								</div>
							)}
							<div className="p-4">
								<h3 className="text-lg font-semibold text-gray-900 mb-1">
									{book.title}
								</h3>
								<p className="text-sm text-gray-600 mb-2">by {book.author}</p>
								{book.isbn && (
									<p className="text-xs text-gray-400 mb-2">
										ISBN: {book.isbn}
									</p>
								)}
								{book.description && (
									<p className="text-sm text-gray-600 mb-3 line-clamp-2">
										{book.description}
									</p>
								)}
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										book.available
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}>
									{book.available ? "Available" : "Unavailable"}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
