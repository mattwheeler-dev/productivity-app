import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";

const Landing = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<h1 className="text-3xl font-bold mb-6">Welcome to TaskPilot</h1>
			<SignInForm />

			<p className="mt-4 text-sm">
				Don't have an account?{" "}
				<Link to="/signup" className="text-blue-600 underline">
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default Landing;
