import { useEffect, useState } from "react";
import { supabase, Staff } from "../../shared/supabase";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function StaffPage() {
	const [staff, setStaff] = useState<Staff[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

	useEffect(() => {
		fetchStaff();
	}, []);

	const fetchStaff = async () => {
		try {
			const { data, error } = await supabase
				.from("staff")
				.select("*")
				.order("name", { ascending: true });

			if (error) throw error;
			setStaff(data || []);
		} catch (error) {
			console.error("Error fetching staff:", error);
		} finally {
			setLoading(false);
		}
	};

	const departments = Array.from(new Set(staff.map((s) => s.department)));

	const filteredStaff =
		selectedDepartment === "all"
			? staff
			: staff.filter((s) => s.department === selectedDepartment);

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center py-12">Loading...</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Staff</h1>
				{departments.length > 0 && (
					<select
						value={selectedDepartment}
						onChange={(e) => setSelectedDepartment(e.target.value)}
						className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
						<option value="all">All Departments</option>
						{departments.map((dept) => (
							<option key={dept} value={dept}>
								{dept}
							</option>
						))}
					</select>
				)}
			</div>

			{staff.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-12 text-center">
					<p className="text-gray-500 text-lg">
						No staff members available yet.
					</p>
				</div>
			) : filteredStaff.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-12 text-center">
					<p className="text-gray-500 text-lg">
						No staff members in this department.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredStaff.map((member) => (
						<div
							key={member.id}
							className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
							{member.image_url ? (
								<img
									src={member.image_url}
									alt={member.name}
									className="w-full h-64 object-cover"
								/>
							) : (
								<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
									<FiUser className="h-16 w-16 text-gray-400" />
								</div>
							)}
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-1">
									{member.name}
								</h3>
								<p className="text-sm text-indigo-600 font-medium mb-1">
									{member.position}
								</p>
								<p className="text-sm text-gray-600 mb-4">
									{member.department}
								</p>
								{member.bio && (
									<p className="text-sm text-gray-600 mb-4 line-clamp-3">
										{member.bio}
									</p>
								)}
								<div className="space-y-2">
									{member.email && (
										<div className="flex items-center text-sm text-gray-600">
											<FiMail className="mr-2" />
											<a
												href={`mailto:${member.email}`}
												className="hover:text-indigo-600">
												{member.email}
											</a>
										</div>
									)}
									{member.phone && (
										<div className="flex items-center text-sm text-gray-600">
											<FiPhone className="mr-2" />
											<a
												href={`tel:${member.phone}`}
												className="hover:text-indigo-600">
												{member.phone}
											</a>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
