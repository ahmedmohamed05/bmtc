import env from "../config/env";

export interface BookSafe {
	id: number;
	title: string;
	author: string;
	description: string;
	cover_url: string | null;
	created_at: string;
	updated_at: string;
	views_counter: number;
}

export interface LibraryListResponse {
	books: BookSafe[];
	limit: number;
	offset: number;
	hasMore: boolean;
	totalBooksLength: number;
}

export async function fetchLibraryList(
	limit = 6,
	offset = 0,
): Promise<LibraryListResponse> {
	const res = await fetch(
		`${env.VITE_API_URL}/library?limit=${limit}&offset=${offset}`,
	);
	if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
	return res.json();
}

export async function fetchLibraryItem(id: number): Promise<BookSafe> {
	const res = await fetch(`${env.VITE_API_URL}/library/${id}`);
	if (!res.ok) throw new Error(`Book not found: ${res.status}`);
	return res.json();
}
