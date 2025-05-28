import { useState } from "react";

type NewProjectFormProps = {
	onAddProject: (project: {
		title: string;
		details: string;
		due_date?: string;
	}) => void;
	onCancel: () => void;
};

const NewProjectForm = ({ onAddProject, onCancel }: NewProjectFormProps) => {
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [dueDate, setDueDate] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		onAddProject({ title, details, due_date: dueDate || undefined });
		setTitle("");
		setDetails("");
		setDueDate("");
		onCancel();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="border rounded-lg p-4 mb-6 bg-white shadow space-y-4"
		>
			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700"
				>
					Title <span className="text-red-500">*</span>
				</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="details"
					className="block text-sm font-medium text-gray-700"
				>
					Details
				</label>
				<textarea
					id="details"
					value={details}
					onChange={(e) => setDetails(e.target.value)}
					className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label
					htmlFor="dueDate"
					className="block text-sm font-medium text-gray-700"
				>
					Due Date
				</label>
				<input
					id="dueDate"
					type="date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
					className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="flex justify-end gap-2 pt-2">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
				>
					Add Project
				</button>
			</div>
		</form>
	);
};

export default NewProjectForm;
