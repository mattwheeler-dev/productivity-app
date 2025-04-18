// src/components/SignInForm.tsx
import { useState } from "react";
import { supabase } from "../lib/supabase";

const SignInForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
		} else {
			// success — could redirect here
			console.log("Signed in!");
		}

		setLoading(false);
	};

	return (
		<form onSubmit={handleSignIn} className="space-y-4 w-full max-w-sm mx-auto">
			<h2 className="text-xl font-semibold text-center">Sign In</h2>

			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				className="w-full p-2 border rounded"
			/>

			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				className="w-full p-2 border rounded"
			/>

			{error && <p className="text-red-500 text-sm">{error}</p>}

			<button
				type="submit"
				disabled={loading}
				className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
			>
				{loading ? "Signing in..." : "Sign In"}
			</button>
		</form>
	);
};

export default SignInForm;
