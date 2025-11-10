import { useState, useEffect } from "react";
import type { Staff } from "../../shared/supabase";
import { supabase } from "../../shared/supabase";
import TeacherInfo from "../components/TeacherInfo";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function StaffPage() {
	const [staff, setStaff] = useState<Staff[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingStaff, setEditingStaff] = useState<Staff | undefined>();

	useEffect(() => {
		fetchStaff();
	}, []);

	const fetchStaff = async () => {
		try {
			const { data, error } = await supabase
				.from("staff")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;
			setStaff(data || []);
		} catch (error) {
			console.error("Error fetching staff:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this staff member?")) return;

		try {
			const { error } = await supabase.from("staff").delete().eq("id", id);
			if (error) throw error;
			fetchStaff();
		} catch (error) {
			console.error("Error deleting staff:", error);
			alert("Failed to delete staff member");
		}
	};

	const handleEdit = (item: Staff) => {
		setEditingStaff(item);
		setShowForm(true);
	};

	const handleFormSuccess = () => {
		setShowForm(false);
		setEditingStaff(undefined);
		fetchStaff();
	};

	const handleCancel = () => {
		setShowForm(false);
		setEditingStaff(undefined);
	};

	if (loading) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<div className="px-4 py-6 sm:px-0">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
				{!showForm && (
					<button
						onClick={() => setShowForm(true)}
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
						<FiPlus className="mr-2" />
						Add Staff
					</button>
				)}
			</div>

			{showForm ? (
				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<TeacherInfo
						staff={editingStaff}
						onSuccess={handleFormSuccess}
						onCancel={handleCancel}
					/>
				</div>
			) : null}

			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				<ul className="divide-y divide-gray-200">
					{staff.length === 0 ? (
						<li className="px-6 py-8 text-center text-gray-500">
							No staff members yet. Click "Add Staff" to create one.
						</li>
					) : (
						staff.map((item) => (
							<li key={item.id} className="px-6 py-4">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-medium text-gray-900">
											{item.name}
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{item.position} - {item.department}
										</p>
										{item.email && (
											<p className="mt-1 text-xs text-gray-400">
												Email: {item.email}
											</p>
										)}
										{item.phone && (
											<p className="mt-1 text-xs text-gray-400">
												Phone: {item.phone}
											</p>
										)}
									</div>
									<div className="ml-4 flex space-x-2">
										<button
											onClick={() => handleEdit(item)}
											className="text-indigo-600 hover:text-indigo-900">
											<FiEdit className="h-5 w-5" />
										</button>
										<button
											onClick={() => handleDelete(item.id)}
											className="text-red-600 hover:text-red-900">
											<FiTrash2 className="h-5 w-5" />
										</button>
									</div>
								</div>
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
}
