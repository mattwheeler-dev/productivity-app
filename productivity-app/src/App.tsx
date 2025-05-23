import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Landing />} />
				<Route path="/signin" element={<Signin />} />

				{/* Protected routes */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				>
					<Route path="tasks" element={<Tasks />} />
					<Route path="projects" element={<Projects />} />
					<Route path="calendar" element={<Calendar />} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
			<Toaster richColors closeButton />
		</BrowserRouter>
	);
};

export default App;
