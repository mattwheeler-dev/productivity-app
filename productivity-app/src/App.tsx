import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Landing />} />
				<Route path="/signup" element={<Signup />} />

				{/* Protected routes */}
				<Route path="/dashboard" element={<Dashboard />}>
					<Route path="tasks" element={<Tasks />} />
					<Route path="projects" element={<Projects />} />
					<Route path="calendar" element={<Calendar />} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
