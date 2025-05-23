import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			if (error.message.includes("already registered")) {
				setError("An account already exists with this email.");
			} else {
				setError(error.message);
			}
		} else {
			// Email confirmation required
			alert("Check your email to confirm your account!");
			navigate("/signin"); // or wherever you want to send them
		}

		setLoading(false);
	};

	return (
		<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
			<form onSubmit={handleSignup} className="space-y-4">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-4 py-2 border rounded"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-4 py-2 border rounded"
					required
				/>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
				>
					{loading ? "Creating Account..." : "Sign Up"}
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
