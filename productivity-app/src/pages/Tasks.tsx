import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { Plus } from "lucide-react";
import TaskCard from "../components/TaskCard";
import NewTaskForm from "../components/NewTaskForm";

type Task = {
	id: number;
	title: string;
	details: string;
	due_date?: string;
	completed: boolean;
	user_id: string;
};

const Tasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [showForm, setShowForm] = useState(false);

	const addTask = (task: {
		title: string;
		details: string;
		due_date?: string;
	}) => {
		const newTask = {
			...task,
			id: Date.now(),
			completed: false,
		};
		setTasks((prev) => [newTask, ...prev]);
	};

	const deleteTask = (id: number) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h2 className="text-2xl font-semibold mb-6">📝 Tasks</h2>

			{showForm ? (
				<NewTaskForm onAddTask={addTask} onCancel={() => setShowForm(false)} />
			) : (
				<button
					onClick={() => setShowForm(true)}
					className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
				>
					<Plus size={20} />
					New Task
				</button>
			)}

			<div className="space-y-4">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} onDelete={deleteTask} />
				))}
			</div>
		</div>
	);
};

export default Tasks;
