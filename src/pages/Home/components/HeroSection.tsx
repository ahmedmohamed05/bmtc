import { useState } from "react";
import { useChat } from "../../../hooks/useChat";

export default function HeroSection() {
  const { sendMessage, loading, error, reply } = useChat();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    await sendMessage(message);
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-gray-900 z-0 bg-[url('/hero_bg.png')]" 
      />
      {/* Dark Overlay for readabilty */}
      <div className="absolute inset-0 bg-gray-900/60 z-10" />

      {/* Main Content */}
      <div className="container relative z-20 mx-auto px-4 flex flex-col items-center mt-10">
        <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-blue-600" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-16 text-center transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
          الكلية التقنية الادارية ترحب بكم
        </h1>
        
        {/* Chatbot Input Section */}
        <div className="w-full max-w-2xl relative">
          <form 
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-2xl flex items-center gap-3 transition-all focus-within:ring-2 focus-within:ring-blue-400 focus-within:bg-white/20 group"
          >
             <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shrink-0 transform group-hover:rotate-12 transition-transform">
               <span className="text-2xl">🤖</span>
             </div>
             <input 
               type="text" 
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="تعرف على Mr. Handala - اسألني أي شيء..." 
               className="flex-1 bg-transparent text-white placeholder-gray-100 outline-none text-lg px-2 disabled:opacity-50"
               disabled={loading}
             />
             <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed active:scale-95 text-white px-6 py-2 h-12 rounded-full transition-all font-bold shadow-lg flex items-center justify-center min-w-[100px]"
             >
               {loading ? (
                 <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
               ) : (
                 "إرسال"
               )}
             </button>
          </form>

          {/* Chat Response Display */}
          {(reply || error) && (
            <div className="absolute top-full mt-6 w-full bg-white/95 backdrop-blur-xl text-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-100 text-right animate-fade-in-up">
               <div className="flex justify-between items-start mb-3">
                 <h4 className="font-bold text-blue-600 flex items-center gap-2">
                   <span className="text-xl">🤖</span> Mr. Handala
                 </h4>
               </div>
               {error && <p className="text-red-500 rtl font-medium">{error}</p>}
               {reply && <p className="rtl whitespace-pre-wrap leading-relaxed text-gray-700">{reply}</p>}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative background gradients */}
      <div className="absolute -bottom-1/2 left-0 w-full h-[800px] bg-blue-500/20 blur-[120px] rounded-full z-10 pointer-events-none" />
    </section>
  );
}
