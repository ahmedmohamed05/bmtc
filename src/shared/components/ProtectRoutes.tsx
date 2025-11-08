import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase";

interface ProtectRoutesProps {
	children: React.ReactNode;
}

export default function ProtectRoutes({ children }: ProtectRoutesProps) {
	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		checkAuth();

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setAuthenticated(!!session);
			setLoading(false);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const checkAuth = async () => {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setAuthenticated(!!session);
		} catch (error) {
			console.error("Error checking auth:", error);
			setAuthenticated(false);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	if (!authenticated) {
		return <Navigate to="/admin/auth" replace />;
	}

	return <>{children}</>;
}
