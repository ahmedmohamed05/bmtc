import { Link, useLocation } from "react-router-dom";
import {
	FiHome,
	FiFileText,
	FiCalendar,
	FiBook,
	FiUsers,
} from "react-icons/fi";

export default function Navigation() {
	const location = useLocation();

	const isActive = (path: string) => {
		return (
			location.pathname === path || location.pathname.startsWith(path + "/")
		);
	};

	const navItems = [
		{ path: "/home", label: "Home", icon: FiHome },
		{ path: "/news", label: "News", icon: FiFileText },
		{ path: "/events", label: "Events", icon: FiCalendar },
		{ path: "/library", label: "Library", icon: FiBook },
		{ path: "/staff", label: "Staff", icon: FiUsers },
	];

	return (
		<nav className="bg-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="shrink-0 flex items-center">
							<Link to="/home" className="text-xl font-bold text-gray-800">
								الكلية التقنية الادارية
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							{navItems.map((item) => {
								const Icon = item.icon;
								return (
									<Link
										key={item.path}
										to={item.path}
										className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
											isActive(item.path)
												? "border-indigo-500 text-gray-900"
												: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
										}`}>
										<Icon className="mr-1" />
										{item.label}
									</Link>
								);
							})}
						</div>
					</div>
					<div className="flex items-center">
						<Link
							to="/admin/auth"
							className="text-sm text-gray-500 hover:text-gray-700">
							Admin
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
