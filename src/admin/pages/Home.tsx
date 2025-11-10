import { Link } from "react-router-dom";
import { MAIN_STATS } from "../actions";

export default function Home() {
	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
				<p className="mt-2 text-gray-600">
					مربحًا بك في لوحة تحكم موقع الكلية التقنية الأدارية
				</p>
			</div>
			{/* TODO here we can add count for every thing, i.e. number of evens, news and staff */}
			<div className="mt-8 bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					أضافة سريعة
				</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{/* <Link
						to="/admin/news"
						className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
						<span className="text-sm font-medium text-gray-700">Add News</span>
					</Link> */}

					{MAIN_STATS.map((stat) => (
						<Link
							key={stat.link}
							to={stat.link}
							className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-blue hover:bg-indigo-50 transition-colors">
							<span className="text-sm font-medium text-gray-700">
								{stat.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
