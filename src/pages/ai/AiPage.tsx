import { useState, useRef, useEffect } from "react";
import { useChat, type ChatMessage } from "../../hooks/useChat";
import { Link } from "react-router-dom";

/* ─── Suggested Questions ──────────────────────────────────── */
const SUGGESTIONS = [
  "ما هي الأقسام المتاحة في الكلية؟",
  "كيف يمكنني التسجيل في الكلية؟",
  "ما هي ساعات العمل الرسمية؟",
  "هل تتوفر منح دراسية؟",
];

/* ─── Message Bubble ───────────────────────────────────────── */
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-[fadeSlideUp_0.3s_ease-out]`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-lg shrink-0 mt-1 shadow-lg shadow-blue-500/30">
          🤖
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl leading-relaxed text-[15px] whitespace-pre-wrap ${
          isUser
            ? "bg-linear-to-br from-blue-600 to-blue-500 text-white rounded-bl-2xl rounded-br-sm mr-0 ml-2 shadow-lg shadow-blue-600/20"
            : "bg-white/10 backdrop-blur-sm text-gray-100 rounded-br-2xl rounded-bl-sm ml-0 mr-2 border border-white/10"
        }`}
      >
        {msg.content}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-1 shadow-lg shadow-sky-600/30">
          أنت
        </div>
      )}
    </div>
  );
}

/* ─── Typing Indicator ─────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex justify-start animate-[fadeSlideUp_0.3s_ease-out]">
      <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-lg shrink-0 mt-1 shadow-lg shadow-blue-500/30">
        🤖
      </div>
      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-sm px-5 py-4 mr-2 flex items-center gap-1.5">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

/* ─── Welcome State ────────────────────────────────────────── */
function WelcomeState({ onSuggestionClick }: { onSuggestionClick: (q: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8 px-4 animate-[fadeSlideUp_0.5s_ease-out]">
      {/* Icon */}
      <div className="relative">
        <div className="w-28 h-28 rounded-3xl bg-linear-to-br from-blue-500/20 to-cyan-400/20 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl rotate-6 transition-transform hover:rotate-0 duration-500">
          <span className="text-6xl -rotate-6 hover:rotate-0 transition-transform duration-500">🤖</span>
        </div>
        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-green-400 border-4 border-gray-900 animate-pulse" />
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-white">مرحباً! أنا Mr. Handala</h2>
        <p className="text-gray-400 text-lg max-w-md">
          مساعدك الذكي في الكلية التقنية الادارية. اسألني أي شيء عن الكلية، الأقسام، التسجيل، أو أي استفسار آخر!
        </p>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSuggestionClick(q)}
            className="px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/15 hover:text-white hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function AiPage() {
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom within the messages container
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const msg = input;
    setInput("");
    await sendMessage(msg);
    inputRef.current?.focus();
  };

  const handleSuggestion = async (q: string) => {
    await sendMessage(q);
  };

  return (
    <div dir="rtl" className="h-screen flex flex-col bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 font-sans overflow-hidden">
      {/* ─── Top Bar ─────────────────────────────────── */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 shrink-0">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
            >
              🤖
            </Link>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Mr. Handala</h1>
              <span className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                متصل الآن
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                محادثة جديدة
              </button>
            )}
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              الرئيسية
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Messages Area (scrollable, fills remaining space) ─── */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto py-6 flex flex-col">
        <div className="container mx-auto px-4 max-w-3xl flex-1 flex flex-col">
          {messages.length === 0 && !loading ? (
            <WelcomeState onSuggestionClick={handleSuggestion} />
          ) : (
            <div className="flex flex-col gap-5">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {loading && <TypingIndicator />}

              {/* Error Toast */}
              {error && (
                <div className="flex justify-center animate-[fadeSlideUp_0.3s_ease-out]">
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-3 rounded-xl text-sm flex items-center gap-2 backdrop-blur-sm">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* ─── Input Bar ───────────────────────────────── */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-t border-white/5 px-4 py-4 shrink-0">
        <form
          onSubmit={handleSubmit}
          className="container mx-auto max-w-3xl flex items-center gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب سؤالك هنا..."
            disabled={loading}
            className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 rounded-xl px-5 py-3.5 text-[15px] outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none active:scale-95 transition-all duration-300 cursor-pointer shrink-0"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
