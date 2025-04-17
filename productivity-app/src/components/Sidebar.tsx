export const Sidebar = () => {
	return (
		<aside className="w-64 bg-white border-r h-full p-4">
			<nav className="space-y-4">
				<div className="text-gray-500 uppercase text-sm font-bold mb-2">
					Menu
				</div>
				<ul className="space-y-2">
					<li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
					<li className="hover:text-blue-600 cursor-pointer">Tasks</li>
					<li className="hover:text-blue-600 cursor-pointer">Calendar</li>
					<li className="hover:text-blue-600 cursor-pointer">Notes</li>
				</ul>
			</nav>
		</aside>
	);
};
