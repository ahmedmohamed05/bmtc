import env from "../config/env";

export interface BookDepartmentSafe {
  id: number;
  name: string;
  name_ar: string | null;
}

export interface BookSafe {
  id: number;
  title: string;
  author: string;
  description: string;
  major: string | null;
  book_rank: number | null;
  row_number: number | null;
  print_date: number | null;
  department: BookDepartmentSafe | null;
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
  offset = 0
): Promise<LibraryListResponse> {
  const res = await fetch(
    `${env.VITE_API_URL}/library?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
  return res.json();
}

export async function fetchLibraryItem(id: number): Promise<BookSafe> {
  const res = await fetch(`${env.VITE_API_URL}/library/${id}`);
  if (!res.ok) throw new Error(`Book not found: ${res.status}`);
  return res.json();
}

export interface LibraryCount {
  count: number;
}

export async function fetchLibraryCount(accessToken?: string): Promise<LibraryCount> {
  const headers: Record<string, string> = {};
  if (accessToken) headers.Cookie = `accessToken=${accessToken}`; // Though cookies usually are sent natively by credentials:'include', just in case or we won't pass it as it depends on user state. Actually, if we're doing request from browser with cookies, credentials might be needed. Alternatively, the docs mention it needs Auth for certain things BUT GET library/count docs state Auth Required: Yes.
  
  // Actually, wait, let's just make a standard fetch without custom headers since credentials might be enough.
  const res = await fetch(`${env.VITE_API_URL}/library/count`, {
     // we assume the platform handles cookies automatically, or if this is public maybe we can just hit it. Wait, the docs say Auth Required: Yes for library count! 
  });
  if (!res.ok) throw new Error(`Failed to fetch library count: ${res.status}`);
  return res.json();
}
