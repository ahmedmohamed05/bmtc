import { Routes, Route, Navigate } from "react-router-dom";
import ProtectRoutes from "../shared/components/ProtectRoutes";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import News from "./pages/News";
import Events from "./pages/Events";
import Library from "./pages/Library";
import Staff from "./pages/Staff";
import "./admin.css";
import AdminLayout from "./components/Layout";

export default function AdminRouter() {
	return (
		<Routes>
			<Route path="auth" element={<Auth />} />
			<Route
				path="*"
				element={
					<ProtectRoutes>
						<AdminLayout>
							<Routes>
								<Route path="home" element={<Home />} />
								<Route path="news" element={<News />} />
								<Route path="events" element={<Events />} />
								<Route path="library" element={<Library />} />
								<Route path="staff" element={<Staff />} />
								<Route
									path="*"
									element={<Navigate to="/admin/home" replace />}
								/>
							</Routes>
						</AdminLayout>
					</ProtectRoutes>
				}
			/>
		</Routes>
	);
}
