import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

		// Check if email is already registered
		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		//  If account already exists, show error message
		if (!signInError) {
			toast.error("There is already an account with this email.");
			setLoading(false);
			return;
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.log(error);
			if (error.message.includes("already registered")) {
				toast.error("There is already an account with this email.");
			} else {
				setError(error.message);
			}
		} else {
			toast.success("Account created! Check your email to confirm.");
			navigate("/signin");
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
