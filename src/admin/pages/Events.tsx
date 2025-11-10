import { useState, useEffect } from "react";
import type { Event } from "../../shared/supabase";
import { supabase } from "../../shared/supabase";
import EventForm from "../components/EventForm";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function EventsPage() {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | undefined>();

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const { data, error } = await supabase
				.from("events")
				.select("*")
				.order("date", { ascending: false });

			if (error) throw error;
			setEvents(data || []);
		} catch (error) {
			console.error("Error fetching events:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this event?")) return;

		try {
			const { error } = await supabase.from("events").delete().eq("id", id);
			if (error) throw error;
			fetchEvents();
		} catch (error) {
			console.error("Error deleting event:", error);
			alert("Failed to delete event");
		}
	};

	const handleEdit = (item: Event) => {
		setEditingEvent(item);
		setShowForm(true);
	};

	const handleFormSuccess = () => {
		setShowForm(false);
		setEditingEvent(undefined);
		fetchEvents();
	};

	const handleCancel = () => {
		setShowForm(false);
		setEditingEvent(undefined);
	};

	if (loading) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<div className="px-4 py-6 sm:px-0">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
				{!showForm && (
					<button
						onClick={() => setShowForm(true)}
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
						<FiPlus className="mr-2" />
						Add Event
					</button>
				)}
			</div>

			{showForm ? (
				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<EventForm
						event={editingEvent}
						onSuccess={handleFormSuccess}
						onCancel={handleCancel}
					/>
				</div>
			) : null}

			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				<ul className="divide-y divide-gray-200">
					{events.length === 0 ? (
						<li className="px-6 py-8 text-center text-gray-500">
							No events yet. Click "Add Event" to create one.
						</li>
					) : (
						events.map((item) => (
							<li key={item.id} className="px-6 py-4">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-medium text-gray-900">
											{item.title}
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{item.description}
										</p>
										<div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
											<span>
												Date: {new Date(item.date).toLocaleDateString()}
											</span>
											{item.location && <span>Location: {item.location}</span>}
										</div>
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
