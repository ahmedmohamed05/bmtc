import { useEffect, useState } from "react";
import { supabase } from "../../shared/supabase";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export interface AdminLayoutProps {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
	const navigate = useNavigate();
	const [adminEmail, setAdminEmail] = useState<string | undefined>(undefined);

	// Get the email of the current admin
	useEffect(() => {
		const fetchAdminEmail = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error || !data.user) {
				navigate("/admin/auth");
				return;
			}
			setAdminEmail(data.user.email);
		};

		fetchAdminEmail();
	}, [navigate]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/admin/auth");
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow sticky top-0 z-50">
				<div className="container mx-auto">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-bold text-gray-800">{adminEmail}</h1>
						</div>
						<div className="flex items-center">
							<button
								onClick={handleLogout}
								className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
								تسجيل خروج
							</button>
						</div>
					</div>
				</div>
			</nav>
			<div className="flex">
				<Sidebar />
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
}
