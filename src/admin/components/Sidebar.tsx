import { Link, useLocation } from "react-router-dom";
import STATS from "../actions";

export default function Sidebar() {
	const location = useLocation();

	const isActive = (link: string) => {
		return (
			location.pathname === link || location.pathname.startsWith(link + "/")
		);
	};

	return (
		<aside className="w-64 bg-white shadow-lg min-h-screen">
			<div className="p-4">
				<h2 className="text-xl font-bold text-gray-800 mb-6">قائمة الادارة</h2>
				<nav>
					<ul className="space-y-2">
						{STATS.map((stat) => {
							const active = isActive(stat.link);
							return (
								<li key={stat.link}>
									<Link
										to={stat.link}
										className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											active
												? "bg-primary-blue/10 text-primary-blue border-l-4 border-primary-blue"
												: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										}`}>
										<div className="w-6 h-6 flex items-center justify-center shrink-0">
											<img
												src={stat.icon}
												alt={stat.name}
												className={`w-6 h-6 object-contain ${
													active ? "icon-primary-blue" : "icon-gray"
												}`}
											/>
										</div>
										<span className="text-sm font-medium">{stat.name}</span>
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

// <Link
// key={stat.name}
// to={stat.link}
// className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
// <div className="p-5">
//   <div className="flex items-center">
//     <div className={`${stat.color} p-3 rounded-md`}></div>
//     <div className="ml-5 w-0 flex-1">
//       <dl>
//         <dt className="text-sm font-medium text-gray-500 truncate">
//           {stat.name}
//         </dt>
//         <dd className="text-lg font-semibold text-gray-900">
//           {/* {stat.count} */}
//           count
//         </dd>
//       </dl>
//     </div>
//   </div>
// </div>
// </Link>
