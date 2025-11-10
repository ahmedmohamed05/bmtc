import { useState } from "react";
import type { Staff } from "../../shared/supabase";
import { supabase } from "../../shared/supabase";

interface TeacherInfoProps {
	staff?: Staff;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function TeacherInfo({
	staff,
	onSuccess,
	onCancel,
}: TeacherInfoProps) {
	const [name, setName] = useState(staff?.name || "");
	const [position, setPosition] = useState(staff?.position || "");
	const [department, setDepartment] = useState(staff?.department || "");
	const [email, setEmail] = useState(staff?.email || "");
	const [phone, setPhone] = useState(staff?.phone || "");
	const [imageUrl, setImageUrl] = useState(staff?.image_url || "");
	const [bio, setBio] = useState(staff?.bio || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (staff) {
				const { error: updateError } = await supabase
					.from("staff")
					.update({
						name,
						position,
						department,
						email: email || null,
						phone: phone || null,
						image_url: imageUrl || null,
						bio: bio || null,
						updated_at: new Date().toISOString(),
					})
					.eq("id", staff.id);

				if (updateError) throw updateError;
			} else {
				const { error: insertError } = await supabase.from("staff").insert([
					{
						name,
						position,
						department,
						email: email || null,
						phone: phone || null,
						image_url: imageUrl || null,
						bio: bio || null,
					},
				]);

				if (insertError) throw insertError;
			}

			onSuccess();
		} catch (err: unknown) {
			setError((err as Error).message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}

			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700">
					Name *
				</label>
				<input
					type="text"
					id="name"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="position"
						className="block text-sm font-medium text-gray-700">
						Position *
					</label>
					<input
						type="text"
						id="position"
						required
						value={position}
						onChange={(e) => setPosition(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
					/>
				</div>
				<div>
					<label
						htmlFor="department"
						className="block text-sm font-medium text-gray-700">
						Department *
					</label>
					<input
						type="text"
						id="department"
						required
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700">
						Email (optional)
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
					/>
				</div>
				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700">
						Phone (optional)
					</label>
					<input
						type="tel"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="imageUrl"
					className="block text-sm font-medium text-gray-700">
					Image URL (optional)
				</label>
				<input
					type="url"
					id="imageUrl"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="bio"
					className="block text-sm font-medium text-gray-700">
					Bio (optional)
				</label>
				<textarea
					id="bio"
					rows={4}
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div className="flex justify-end space-x-3">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
					Cancel
				</button>
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
					{loading ? "Saving..." : staff ? "Update" : "Create"}
				</button>
			</div>
		</form>
	);
}
