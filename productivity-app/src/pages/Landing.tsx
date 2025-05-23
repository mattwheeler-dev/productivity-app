import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const Landing = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<h1 className="text-3xl font-bold mb-6">Welcome to TaskPilot</h1>
			<SignUpForm />

			<p className="mt-4 text-sm">
				Already have an account?{" "}
				<Link to="/signIn" className="text-blue-600 underline">
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default Landing;
