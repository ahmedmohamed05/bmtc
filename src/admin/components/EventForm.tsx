import { useState } from "react";
import type { Event } from "../../shared/supabase";
import { supabase } from "../../shared/supabase";

interface EventFormProps {
	event?: Event;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function EventForm({
	event,
	onSuccess,
	onCancel,
}: EventFormProps) {
	const [title, setTitle] = useState(event?.title || "");
	const [description, setDescription] = useState(event?.description || "");
	const [date, setDate] = useState(event?.date ? event.date.split("T")[0] : "");
	const [time, setTime] = useState(
		event?.date ? event.date.split("T")[1]?.slice(0, 5) : ""
	);
	const [location, setLocation] = useState(event?.location || "");
	const [imageUrl, setImageUrl] = useState(event?.image_url || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const eventDate = time ? `${date}T${time}:00` : `${date}T00:00:00`;

			if (event) {
				const { error: updateError } = await supabase
					.from("events")
					.update({
						title,
						description,
						date: eventDate,
						location: location || null,
						image_url: imageUrl || null,
						updated_at: new Date().toISOString(),
					})
					.eq("id", event.id);

				if (updateError) throw updateError;
			} else {
				const { error: insertError } = await supabase.from("events").insert([
					{
						title,
						description,
						date: eventDate,
						location: location || null,
						image_url: imageUrl || null,
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
					htmlFor="title"
					className="block text-sm font-medium text-gray-700">
					Title
				</label>
				<input
					type="text"
					id="title"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					id="description"
					required
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="date"
						className="block text-sm font-medium text-gray-700">
						Date
					</label>
					<input
						type="date"
						id="date"
						required
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
					/>
				</div>
				<div>
					<label
						htmlFor="time"
						className="block text-sm font-medium text-gray-700">
						Time (optional)
					</label>
					<input
						type="time"
						id="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="location"
					className="block text-sm font-medium text-gray-700">
					Location (optional)
				</label>
				<input
					type="text"
					id="location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
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
					{loading ? "Saving..." : event ? "Update" : "Create"}
				</button>
			</div>
		</form>
	);
}
