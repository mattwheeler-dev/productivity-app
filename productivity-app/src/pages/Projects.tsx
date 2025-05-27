import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Project } from "../types/project";

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		const fetchProjects = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

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

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h2 className="text-2xl font-semibold mb-6">📁 Projects</h2>
			{projects.length === 0 ? (
				<p className="text-gray-500">No projects found.</p>
			) : (
				<ul className="space-y-4">
					{projects.map((project) => (
						<li key={project.id} className="p-4 bg-white rounded shadow">
							<h3 className="text-lg font-semibold">{project.title}</h3>
							{project.details && (
								<p className="text-gray-600">{project.details}</p>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Projects;
