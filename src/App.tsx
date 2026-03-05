import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import AboutPage from './pages/AboutPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import './config/env'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/news/:id' element={<NewsDetailPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:id' element={<EventDetailPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
