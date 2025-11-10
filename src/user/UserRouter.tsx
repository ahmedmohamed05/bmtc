import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Events from "./pages/Events";
import Library from "./pages/Library";
import Staff from "./pages/Staff";
import Navigation from "./components/Navigation";

function UserLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navigation />
			<main>{children}</main>
		</div>
	);
}

export default function UserRouter() {
	return (
		<UserLayout>
			<Routes>
				<Route path="home" element={<Home />} />
				<Route path="news" element={<News />} />
				<Route path="events" element={<Events />} />
				<Route path="library" element={<Library />} />
				<Route path="staff" element={<Staff />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</UserLayout>
	);
}
