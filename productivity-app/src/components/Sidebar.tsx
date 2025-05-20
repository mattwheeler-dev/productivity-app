import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<aside className="w-64 bg-gray-800 text-white p-4">
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
		</aside>
	);
};

export default Sidebar;
