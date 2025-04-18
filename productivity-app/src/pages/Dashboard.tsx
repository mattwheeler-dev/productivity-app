import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div className="flex min-h-screen">
			{/* Sidebar nav */}
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

			{/* Main content */}
			<main className="flex-1 p-6">
				<Outlet />
			</main>
		</div>
	);
};

export default Dashboard;
