import env from "../config/env";

export interface ChatResponse {
  reply: string;
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${env.VITE_API_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Chat request failed: ${res.status}`);
  }

  return res.json();
}
