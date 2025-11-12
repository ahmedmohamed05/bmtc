import { Link, useLocation } from "react-router-dom";
import STATS from "../actions";
import { useState } from "react";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

export default function Sidebar() {
	const location = useLocation();
	const [isCollapsed, setIsCollapsed] = useState(false);

	const isActive = (link: string) => {
		return (
			location.pathname === link || location.pathname.startsWith(link + "/")
		);
	};

	const asideClass = `bg-white shadow-lg min-h-screen transition-all duration-300 ease-in-out `;
	const spanClass = `text-sm font-medium mr-4 ${isCollapsed && "hidden"}`;

	return (
		<aside className={asideClass}>
			<div className="px-4 py-2">
				<button
					className={`flex items-center px-2 transition-colors mb-4 cursor-pointer bg-gray-100 w-full py-4 rounded-lg`}
					onClick={() => setIsCollapsed(!isCollapsed)}>
					<TbLayoutSidebarRightCollapseFilled
						size={24}
						className={isCollapsed ? `rotate-180` : ""}
					/>

					{!isCollapsed && <span className={spanClass}>اخفاء القائمة</span>}
				</button>
				<nav>
					<ul className="py-2">
						{STATS.map((stat) => {
							const active = isActive(stat.link);
							return (
								<li key={stat.link}>
									<Link
										to={stat.link}
										title={stat.name}
										className={`flex items-center py-3 px-2 my-1 rounded-lg transition-colors
                    ${
											active
												? "bg-primary-blue/10 text-primary-blue border-l-4 border-primary-blue"
												: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										}`}>
										<div className="flex items-center justify-center">
											<img
												src={stat.icon}
												alt={stat.name}
												className={`w-6 h-6 object-contain ${
													active ? "icon-primary-blue" : "icon-gray"
												}`}
											/>
										</div>
										<span className={spanClass}>{stat.name}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</aside>
	);
}
