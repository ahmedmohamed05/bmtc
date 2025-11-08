import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminRouter from "./admin/AdminRouter";
import UserRouter from "./user/UserRouter";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin/*" element={<AdminRouter />} />
				<Route path="/*" element={<UserRouter />} />
				<Route path="/" element={<Navigate to="/home" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
