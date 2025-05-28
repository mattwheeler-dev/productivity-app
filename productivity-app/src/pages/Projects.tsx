import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import NewProjectForm from "../components/NewProjectForm";
import { supabase } from "../lib/supabaseClient";
import { Project } from "../types/project";
import { toast } from "sonner";

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		const fetchProjects = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				console.error("No user is logged in");
				return;
			}

			//Fetch user's projects
			const { data, error } = await supabase
				.from("projects")
				.select("*")
				.eq("user_id", user.id)
				.order("created_at", { ascending: false });

			if (error) console.error("Error fetching projects:", error);
			else setProjects(data);
		};

		fetchProjects();
	}, []);

	const addProject = async (project: {
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
			.from("projects")
			.insert([
				{
					...project,
					user_id: user.id,
					completed: false,
				},
			])
			.select();

		if (error) {
			console.error("Error adding project:", error);
		} else if (data && data.length > 0) {
			setProjects((prev) => [data![0], ...prev]);
		}
	};

	const deleteProject = async (id: number) => {
		const projectToDelete = projects.find((p) => p.id === id);
		if (!projectToDelete) {
			return;
		}

		// Remove from UI
		setProjects((prev) => prev.filter((project) => project.id !== id));

		// Show toast with undo btn
		toast(`Project "${projectToDelete.title}" deleted`, {
			action: {
				label: "Undo",
				// Restore project
				onClick: async () => {
					const { error: insertError } = await supabase
						.from("projects")
						.insert([projectToDelete]);

					if (insertError) {
						console.error(
							`Error restoring project: ${projectToDelete.title}`,
							insertError
						);
						toast.error(
							`Failed to restore project: "${projectToDelete.title}"...`
						);
					} else {
						setProjects((prev) => [projectToDelete, ...prev]);
						toast.success("Project restored!");
					}
				},
			},
		});

		const { error } = await supabase.from("projects").delete().eq("id", id);

		if (error) {
			console.error("Error deleting project:", error);
		}
	};

	return (
		<section className="p-6 max-w-3xl mx-auto">
			<h2 className="text-2xl font-semibold mb-6">📁 Projects</h2>

			{showForm ? (
				<NewProjectForm
					onAddProject={addProject}
					onCancel={() => setShowForm(false)}
				/>
			) : (
				<button
					onClick={() => setShowForm(true)}
					className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 flex items-center gap-2"
				>
					<Plus size={20} />
					New Project
				</button>
			)}

			<div className="space-y-4">
				{projects.length === 0 ? (
					<p className="text-gray-500">No projects found.</p>
				) : (
					projects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							onDelete={deleteProject}
						/>
					))
				)}
			</div>
		</section>
	);
};

export default Projects;
