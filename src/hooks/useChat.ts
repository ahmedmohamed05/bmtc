import { useState, useCallback } from "react";
import { sendChatMessage } from "../services/chat";

export function useChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    setReply(null);

    try {
      const response = await sendChatMessage(message);
      setReply(response.reply);
      return response;
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, reply, sendMessage, setReply };
}
