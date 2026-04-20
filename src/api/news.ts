import env from "../config/env";

export interface NewsSafe {
  id: number;
  title: string;
  content: string;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
  views_counter: number;
}

export interface NewsListResponse {
  news: NewsSafe[];
  limit: number;
  offset: number;
  hasMore: boolean;
  totalNewsLength: number;
}

export async function fetchNewsList(
  limit = 6,
  offset = 0
): Promise<NewsListResponse> {
  const res = await fetch(
    `${env.VITE_API_URL}/news?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
  return res.json();
}

export async function fetchNewsItem(id: number): Promise<NewsSafe> {
  const res = await fetch(`${env.VITE_API_URL}/news/${id}`);
  if (!res.ok) throw new Error(`News not found: ${res.status}`);
  return res.json();
}
