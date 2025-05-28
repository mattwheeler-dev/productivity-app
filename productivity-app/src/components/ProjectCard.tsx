import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ChevronUp } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Project } from "../types/project";

const ProjectCard = ({
	project,
	onDelete,
}: {
	project: Project;
	onDelete: (id: number) => void;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editProject, setEditProject] = useState(project);
	const [isCompleted, setIsCompleted] = useState(project.completed);
	const [showModal, setShowModal] = useState(false);

	const toggleExpanded = () => setIsExpanded((prev) => !prev);

	const handleCheckboxChange = async () => {
		const newStatus = !isCompleted;
		setIsCompleted(newStatus);

		const { error } = await supabase
			.from("projects")
			.update({ completed: newStatus })
			.eq("id", project.id);

		if (error) {
			console.error("Error updating project completion:", error);
		}
	};

	const handleEdit = () => {
		setEditProject({ ...project, completed: isCompleted });
		setIsEditing(true);
	};

	const handleCancel = () => {
		setEditProject(project);
		setIsEditing(false);
	};

	const handleSave = async () => {
		const updatedProject = { ...editProject, completed: isCompleted };

		const { error } = await supabase
			.from("projects")
			.update({
				title: updatedProject.title,
				details: updatedProject.details,
				due_date: updatedProject.due_date || null,
				completed: updatedProject.completed,
			})
			.eq("id", updatedProject.id);

		if (error) {
			console.error("Error updating project:", error);
		} else {
			setIsEditing(false);
		}
	};

	const confirmDelete = () => {
		onDelete(project.id);
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
							value={editProject.title}
							onChange={(e) =>
								setEditProject((prev) => ({ ...prev, title: e.target.value }))
							}
							className="text-lg font-medium border-b w-full focus:outline-none"
						/>
					) : (
						<h3 className="text-lg font-medium">{editProject.title}</h3>
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
								value={editProject.details}
								onChange={(e) =>
									setEditProject((prev) => ({
										...prev,
										details: e.target.value,
									}))
								}
								className="w-full border rounded p-2"
							/>
							<input
								type="date"
								value={editProject.due_date || ""}
								onChange={(e) =>
									setEditProject((prev) => ({
										...prev,
										due_date: e.target.value,
									}))
								}
								className="w-full border rounded p-2"
							/>
						</>
					) : (
						<>
							<p className="text-gray-700">{editProject.details}</p>
							{editProject.due_date && (
								<p className="text-sm text-gray-500">
									Due: {editProject.due_date}
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
				taskTitle={project.title}
			/>
		</div>
	);
};

export default ProjectCard;
