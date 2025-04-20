import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // adjust path as needed

type Task = {
	id: number;
	title: string;
	details: string;
	due_date?: string;
	completed: boolean;
	user_id: string;
};

const TaskCard = ({
	task,
	onDelete,
}: {
	task: Task;
	onDelete: (id: number) => void;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editTask, setEditTask] = useState(task);
	const [isCompleted, setIsCompleted] = useState(task.completed);
	const [showModal, setShowModal] = useState(false);

	const toggleExpanded = () => setIsExpanded((prev) => !prev);
	const handleCheckboxChange = () => setIsCompleted((prev) => !prev);

	const handleEdit = () => {
		setEditTask({ ...task, completed: isCompleted });
		setIsEditing(true);
	};

	const handleCancel = () => {
		setEditTask(task);
		setIsEditing(false);
	};

	const handleSave = () => {
		const updatedTask = { ...editTask, completed: isCompleted };
		console.log("Saving task:", updatedTask);
		setIsEditing(false);
	};

	const confirmDelete = () => {
		onDelete(task.id);
		setShowModal(false);
	};

	return (
		<div
			className={`border rounded p-4 shadow-sm transition ${
				isCompleted ? "opacity-60" : "opacity-100"
			}`}
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={isCompleted}
						onChange={handleCheckboxChange}
						className="w-5 h-5"
					/>
					{isEditing ? (
						<input
							type="text"
							value={editTask.title}
							onChange={(e) =>
								setEditTask((prev) => ({ ...prev, title: e.target.value }))
							}
							className="text-lg font-medium border-b w-full focus:outline-none"
						/>
					) : (
						<h3 className="text-lg font-medium">{editTask.title}</h3>
					)}
				</div>
				<button onClick={toggleExpanded}>
					{isExpanded ? <ChevronUp /> : <ChevronDown />}
				</button>
			</div>

			{isExpanded && (
				<div className="mt-4 space-y-2">
					{isEditing ? (
						<>
							<textarea
								value={editTask.details}
								onChange={(e) =>
									setEditTask((prev) => ({
										...prev,
										details: e.target.value,
									}))
								}
								className="w-full border rounded p-2"
							/>
							<input
								type="date"
								value={editTask.due_date || ""}
								onChange={(e) =>
									setEditTask((prev) => ({
										...prev,
										due_date: e.target.value,
									}))
								}
								className="w-full border rounded p-2"
							/>
						</>
					) : (
						<>
							<p className="text-gray-700">{editTask.details}</p>
							{editTask.due_date && (
								<p className="text-sm text-gray-500">
									Due: {editTask.due_date}
								</p>
							)}
						</>
					)}

					<div className="flex gap-2 mt-2">
						{isEditing ? (
							<>
								<button
									onClick={handleSave}
									className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
								>
									Save
								</button>
								<button
									onClick={handleCancel}
									className="text-sm bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
								>
									Cancel
								</button>
							</>
						) : (
							<>
								<button
									onClick={handleEdit}
									className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
								>
									Edit
								</button>
								<button
									onClick={() => setShowModal(true)}
									className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
								>
									Delete
								</button>
							</>
						)}
					</div>
				</div>
			)}

			<ConfirmDeleteModal
				isOpen={showModal}
				onCancel={() => setShowModal(false)}
				onConfirm={confirmDelete}
				taskTitle={task.title}
			/>
		</div>
	);
};

export default TaskCard;
