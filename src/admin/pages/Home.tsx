import { useEffect, useState } from "react";
import { supabase } from "../../shared/supabase";

interface Counts {
	news: number;
	events: number;
	staff: number;
}

interface DepartmentCount {
	department: string;
	count: number;
}

export default function Home() {
	const [counts, setCounts] = useState<Counts>({
		news: 0,
		events: 0,
		staff: 0,
	});
	const [deptCounts, setDeptCounts] = useState<DepartmentCount[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		let isMounted = true;

		const load = async () => {
			setLoading(true);
			setError("");
			try {
				// Count news
				const { count: newsCount, error: newsErr } = await supabase
					.from("news")
					.select("id", { count: "exact", head: true });
				if (newsErr) throw newsErr;

				// Count events
				const { count: eventsCount, error: eventsErr } = await supabase
					.from("events")
					.select("id", { count: "exact", head: true });
				if (eventsErr) throw eventsErr;

				// Count staff
				const { count: staffCount, error: staffErr } = await supabase
					.from("staff")
					.select("id", { count: "exact", head: true });
				if (staffErr) throw staffErr;

				// Students per department
				const { data: studentsRows, error: studentsErr } = await supabase
					.from("students")
					.select("department");
				let deptAgg: DepartmentCount[] = [];
				if (!studentsErr && Array.isArray(studentsRows)) {
					const map = new Map<string, number>();
					for (const row of studentsRows as Array<{
						department: string | null;
					}>) {
						const dept = (row.department || "غير محدد").trim();
						map.set(dept, (map.get(dept) || 0) + 1);
					}
					deptAgg = Array.from(map.entries())
						.map(([department, count]) => ({ department, count }))
						.sort((a, b) => b.count - a.count);
				}

				if (!isMounted) return;
				setCounts({
					news: newsCount || 0,
					events: eventsCount || 0,
					staff: staffCount || 0,
				});
				setDeptCounts(deptAgg);
			} catch {
				if (!isMounted) return;
				setError("تعذر تحميل الإحصائيات");
			} finally {
				if (isMounted) setLoading(false);
			}
		};
		load();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="px-4 py-6 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
				<p className="mt-2 text-gray-600">
					مربحًا بك في لوحة تحكم موقع الكلية التقنية الأدارية
				</p>
			</div>

			{error && (
				<div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-red-700">
					{error}
				</div>
			)}

			{/* Summary cards */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div className="rounded-lg bg-white p-6 shadow">
					<p className="text-sm text-gray-500">الأخبار</p>
					<p className="mt-2 text-3xl font-semibold text-gray-900">
						{counts.news}
					</p>
				</div>
				<div className="rounded-lg bg-white p-6 shadow">
					<p className="text-sm text-gray-500">الأحداث</p>
					<p className="mt-2 text-3xl font-semibold text-gray-900">
						{counts.events}
					</p>
				</div>
				<div className="rounded-lg bg-white p-6 shadow">
					<p className="text-sm text-gray-500">التدريسيون</p>
					<p className="mt-2 text-3xl font-semibold text-gray-900">
						{counts.staff}
					</p>
				</div>
			</div>

			{/* Students per department */}
			<div className="mt-8 rounded-lg bg-white p-6 shadow">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-900">
						الطلبة حسب الأقسام
					</h2>
					{loading && (
						<span className="text-sm text-gray-500">جاري التحميل...</span>
					)}
				</div>
				{deptCounts.length === 0 && !loading ? (
					<p className="text-gray-500">لا توجد بيانات طلبة معروضة.</p>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
										القسم
									</th>
									<th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
										عدد الطلبة
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100 bg-white">
								{deptCounts.map((d) => (
									<tr key={d.department}>
										<td className="px-4 py-2 text-sm text-gray-900">
											{d.department}
										</td>
										<td className="px-4 py-2 text-sm font-semibold text-gray-900">
											{d.count}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
