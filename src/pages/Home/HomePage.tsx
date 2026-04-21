import MainLayout from "../../components/Layout/MainLayout";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import DepartmentsSection from "./components/DepartmentsSection";
import NewsSection from "./components/NewsSection";
import EventsSection from "./components/EventsSection";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <IntroSection />
      <DepartmentsSection />
      <NewsSection />
      <EventsSection />
    </MainLayout>
  );
}
