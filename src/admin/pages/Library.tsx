import { useState, useEffect } from "react";
import type { Book } from "../../shared/supabase";
import { supabase } from "../../shared/supabase";
import BookForm from "../components/BookForm";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function LibraryPage() {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingBook, setEditingBook] = useState<Book | undefined>();

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			const { data, error } = await supabase
				.from("books")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;
			setBooks(data || []);
		} catch (error) {
			console.error("Error fetching books:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this book?")) return;

		try {
			const { error } = await supabase.from("books").delete().eq("id", id);
			if (error) throw error;
			fetchBooks();
		} catch (error) {
			console.error("Error deleting book:", error);
			alert("Failed to delete book");
		}
	};

	const handleEdit = (item: Book) => {
		setEditingBook(item);
		setShowForm(true);
	};

	const handleFormSuccess = () => {
		setShowForm(false);
		setEditingBook(undefined);
		fetchBooks();
	};

	const handleCancel = () => {
		setShowForm(false);
		setEditingBook(undefined);
	};

	if (loading) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<div className="px-4 py-6 sm:px-0">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Library Management</h1>
				{!showForm && (
					<button
						onClick={() => setShowForm(true)}
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
						<FiPlus className="mr-2" />
						Add Book
					</button>
				)}
			</div>

			{showForm ? (
				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<BookForm
						book={editingBook}
						onSuccess={handleFormSuccess}
						onCancel={handleCancel}
					/>
				</div>
			) : null}

			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				<ul className="divide-y divide-gray-200">
					{books.length === 0 ? (
						<li className="px-6 py-8 text-center text-gray-500">
							No books yet. Click "Add Book" to create one.
						</li>
					) : (
						books.map((item) => (
							<li key={item.id} className="px-6 py-4">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-medium text-gray-900">
											{item.title}
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											by {item.author}
										</p>
										{item.isbn && (
											<p className="mt-1 text-xs text-gray-400">
												ISBN: {item.isbn}
											</p>
										)}
										<div className="mt-2">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													item.available
														? "bg-green-100 text-green-800"
														: "bg-red-100 text-red-800"
												}`}>
												{item.available ? "Available" : "Unavailable"}
											</span>
										</div>
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
	);
}
