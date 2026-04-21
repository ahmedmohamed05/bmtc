import { useState, useCallback, useRef } from "react";
import { sendChatMessage } from "../services/chat";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const idCounter = useRef(0);

  const genId = () => `msg-${Date.now()}-${idCounter.current++}`;

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    setReply(null);

    const userMsg: ChatMessage = {
      id: genId(),
      role: "user",
      content: message.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await sendChatMessage(message);
      const assistantMsg: ChatMessage = {
        id: genId(),
        role: "assistant",
        content: response.reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setReply(response.reply);
      return response;
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setReply(null);
    setError(null);
  }, []);

  return { messages, loading, error, reply, sendMessage, setReply, clearChat };
}
