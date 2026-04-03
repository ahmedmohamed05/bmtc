import { useEffect, useRef, useState } from "react";
import env from "../config/env";
import "./ChatPage.css";

type ChatMessage = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const initialBotText = "مرحباً! أنا Mr.Hambula جاهز وبخدمتك. اطرح سؤالك الآن.";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started) {
      setMessages([{
        id: 1,
        sender: "bot",
        text: initialBotText,
      }]);
    }
  }, [started]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function fetchBotResponse(question: string) {
    try {
      const response = await fetch(`${env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const data = await response.json();
      return data.reply || "عذراً، لم أتلقَّى ردّاً من الخادم.";
    } catch (error) {
      console.error("Chat API fetch error:", error);
      return "عذراً، حدث خطأ في خدمة الدردشة. الرجاء المحاولة لاحقاً.";
    }
  }

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const nextId = messages.length + 1;
    setMessages((prev) => [...prev, { id: nextId, sender: "user", text }]);
    setInput("");

    // Add temporary message
    const tempId = nextId + 1;
    setMessages((prev) => [...prev, {
      id: tempId,
      sender: "bot",
      text: "حسناً! لقد استلمت سؤالك، وسأرد عليك قريباً بمعلومة دقيقة."
    }]);

    // Fetch real response and replace temporary message
    const replyText = await fetchBotResponse(text);
    setMessages((prev) => prev.map(msg =>
      msg.id === tempId ? { ...msg, text: replyText } : msg
    ));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-app-shell">
      <div className="app-topbar">
        <div className="app-title">
          <span>الكلية التقنية الإدارية</span>
          <div className="app-logo" />
        </div>
      </div>

      <div className="app-content">
        <div className="chat-robot-block">
          <svg className="robot-svg" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" aria-label="Mr.Hambula astronaut robot">
            {/* Boots */}
            <ellipse cx="70" cy="260" rx="18" ry="12" fill="#ffffff" stroke="#47a8ff" strokeWidth="2" />
            <ellipse cx="130" cy="260" rx="18" ry="12" fill="#ffffff" stroke="#47a8ff" strokeWidth="2" />

            {/* Legs */}
            <rect x="60" y="220" width="20" height="45" rx="10" fill="#e8f4f8" stroke="#47a8ff" strokeWidth="2" />
            <rect x="120" y="220" width="20" height="45" rx="10" fill="#e8f4f8" stroke="#47a8ff" strokeWidth="2" />

            {/* Body */}
            <ellipse cx="100" cy="160" rx="45" ry="50" fill="#ffffff" stroke="#47a8ff" strokeWidth="2" />

            {/* Chest Panel */}
            <ellipse cx="100" cy="155" rx="25" ry="20" fill="#e8f4f8" stroke="#47a8ff" strokeWidth="1" />
            <circle cx="90" cy="150" r="3" fill="#1fb9ff" />
            <circle cx="100" cy="150" r="3" fill="#1fb9ff" />
            <circle cx="110" cy="150" r="3" fill="#1fb9ff" />

            {/* Left Arm (down) */}
            <ellipse cx="45" cy="170" rx="12" ry="35" fill="#e8f4f8" stroke="#47a8ff" strokeWidth="2" />

            {/* Right Arm (waving up) */}
            <ellipse cx="155" cy="130" rx="12" ry="35" fill="#e8f4f8" stroke="#47a8ff" strokeWidth="2" transform="rotate(45 155 130)" />

            {/* Hands */}
            <circle cx="45" cy="210" r="10" fill="#ffffff" stroke="#47a8ff" strokeWidth="2" />
            <circle cx="175" cy="110" r="10" fill="#ffffff" stroke="#47a8ff" strokeWidth="2" />

            {/* Helmet (round) */}
            <circle cx="100" cy="70" r="50" fill="#ffffff" stroke="#47a8ff" strokeWidth="2" />

            {/* Glowing Visor */}
            <ellipse cx="100" cy="75" rx="35" ry="25" fill="#1fb9ff" opacity="0.8" />
            <ellipse cx="100" cy="78" rx="30" ry="20" fill="#64c8ff" opacity="0.6" />

            {/* Cute Eyes in Visor */}
            <circle cx="88" cy="75" r="6" fill="#ffffff" />
            <circle cx="112" cy="75" r="6" fill="#ffffff" />
            <circle cx="90" cy="73" r="2" fill="#004a92" />
            <circle cx="114" cy="73" r="2" fill="#004a92" />

            {/* Friendly Smile */}
            <path d="M 85 85 Q 100 95 115 85" stroke="#004a92" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Antenna */}
            <line x1="100" y1="20" x2="100" y2="10" stroke="#47a8ff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="8" r="4" fill="#ffd471" />

            {/* Backpack */}
            <ellipse cx="160" cy="160" rx="15" ry="25" fill="#e8f4f8" stroke="#47a8ff" strokeWidth="2" />
            <circle cx="160" cy="155" r="4" fill="#1fb9ff" opacity="0.7" />

            {/* Shoulder Pads */}
            <circle cx="55" cy="140" r="12" fill="#d7efff" stroke="#47a8ff" strokeWidth="2" />
            <circle cx="145" cy="140" r="12" fill="#d7efff" stroke="#47a8ff" strokeWidth="2" />
          </svg>

          <div className="speech-bubble">Mr.Hambula<br />جاهز وبخدمتك</div>
        </div>
      </div>

      {!started ? (
        <button className="start-chat-btn" onClick={() => setStarted(true)}>ابدأ الدردشة</button>
      ) : (
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-entry">
            <input
              type="text"
              placeholder="اكتب رسالتك..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button onClick={sendMessage} disabled={!input.trim()}>إرسال</button>
          </div>
        </div>
      )}
    </div>
  );
}
