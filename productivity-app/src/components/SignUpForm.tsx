import { useState } from "react";
import { supabase } from "../lib/supabase";

const SignupForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { name },
			},
		});

		setLoading(false);

		if (error) {
			setError(error.message);
		} else {
			setSuccess(true);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
		>
			<h2 className="text-xl font-semibold mb-4">Create an Account</h2>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-1">Name</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="w-full border border-gray-300 rounded px-3 py-2"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-1">Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="w-full border border-gray-300 rounded px-3 py-2"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-1">Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="w-full border border-gray-300 rounded px-3 py-2"
				/>
			</div>

			{error && <p className="text-red-600 text-sm mb-2">{error}</p>}
			{success && (
				<p className="text-green-600 text-sm mb-2">
					Signup successful! Check your email to confirm your account.
				</p>
			)}

			<button
				type="submit"
				disabled={loading}
				className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
			>
				{loading ? "Creating account..." : "Sign Up"}
			</button>
		</form>
	);
};

export default SignupForm;
