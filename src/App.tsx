import "./app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import NewsPage from "./pages/news/NewsPage";
import AiPage from "./pages/ai/AiPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/ai" element={<AiPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
