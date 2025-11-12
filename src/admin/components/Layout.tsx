import { useEffect, useState } from "react";
import { supabase } from "../../shared/supabase";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export interface AdminLayoutProps {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
	const navigate = useNavigate();
	const [adminEmail, setAdminEmail] = useState<string>("");

	// Get the email of the current admin
	useEffect(() => {
		const fetchAdminEmail = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error || !data.user) {
				navigate("/admin/auth");
				return;
			}
			setAdminEmail(data.user.email!);
		};

		fetchAdminEmail();
	}, [navigate]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/admin/auth");
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar email={adminEmail} logoutHandler={handleLogout} />
			<div className="flex">
				<Sidebar />
				<main className="flex-1 transition-all duration-300">{children}</main>
			</div>
		</div>
	);
}
