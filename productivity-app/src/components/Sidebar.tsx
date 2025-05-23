import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const Sidebar = () => {
	const navigate = useNavigate();

	const signOutUser = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error signing out:", error.message);
		} else {
			console.log("User signed out successfully");
			navigate("/signin");
		}
	};

	return (
		<aside className="w-64 bg-brand p-4">
			<h1 className="text-xl font-bold mb-6">TaskPilot</h1>
			<nav className="space-y-3">
				<Link to="tasks" className="block hover:underline">
					🗒️ Tasks
				</Link>
				<Link to="projects" className="block hover:underline">
					📁 Projects
				</Link>
				<Link to="calendar" className="block hover:underline">
					📅 Calendar
				</Link>
				<Link to="settings" className="block hover:underline">
					⚙️ Settings
				</Link>
			</nav>

			<button
				onClick={signOutUser}
				className="mt-6 w-full bg-red-700 text-white py-2 rounded hover:bg-red-500"
			>
				Sign Out
			</button>
		</aside>
	);
};

export default Sidebar;
