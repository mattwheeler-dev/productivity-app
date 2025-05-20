import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import TaskCard from "../components/TaskCard";
import NewTaskForm from "../components/NewTaskForm";
import { supabase } from "../lib/supabaseClient";
import { Task } from "../types/task";

const Tasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		const fetchTasks = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				console.error("No user is logged in");
				return;
			}

			// Fetch user's tasks
			const { data, error } = await supabase
				.from("tasks")
				.select("*")
				.eq("user_id", user.id)
				.order("created_at", { ascending: false });

			if (error) {
				console.error("Error fetching tasks:", error);
			} else {
				setTasks(data);
			}
		};

		fetchTasks();
	}, []);

	const addTask = async (task: {
		title: string;
		details: string;
		due_date?: string;
	}) => {
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user) {
			console.error("User not found:", userError);
			return;
		}

		const { data, error } = await supabase
			.from("tasks")
			.insert([
				{
					...task,
					user_id: user.id,
					completed: false,
				},
			])
			.select();

		if (error) {
			console.error("Error adding task:", error);
		} else if (data && data.length > 0) {
			setTasks((prev) => [data![0], ...prev]);
		}
	};

	const deleteTask = async (id: number) => {
		const { error } = await supabase.from("tasks").delete().eq("id", id);

		if (error) {
			console.error("Error deleting task:", error);
		} else {
			setTasks((prev) => prev.filter((task) => task.id !== id));
		}
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
				{tasks.length === 0 ? (
					<p className="text-gray-500">No tasks found.</p>
				) : (
					tasks.map((task) => (
						<TaskCard key={task.id} task={task} onDelete={deleteTask} />
					))
				)}
			</div>
		</div>
	);
};

export default Tasks;
