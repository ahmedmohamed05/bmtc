import env from "../config/env";

export interface EventImage {
	image_url: string;
}

export interface EventSafe {
	id: number;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
	views_counter: number;
	images: EventImage[];
}

export interface EventListResponse {
	events: EventSafe[];
	limit: number;
	offset: number;
	hasMore: boolean;
	totalEventsLength: number;
}

export async function fetchEventsList(
	limit = 6,
	offset = 0,
): Promise<EventListResponse> {
	const res = await fetch(
		`${env.VITE_API_URL}/events?limit=${limit}&offset=${offset}`,
	);
	if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
	return res.json();
}

export async function fetchEventItem(id: number): Promise<EventSafe> {
	const res = await fetch(`${env.VITE_API_URL}/events/${id}`);
	if (!res.ok) throw new Error(`Event not found: ${res.status}`);
	return res.json();
}
