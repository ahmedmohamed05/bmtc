import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../shared/supabase";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (email === "") {
				setError("الرجاء ادخل البريد الالكتروني");
				throw new Error("الرجاء ادخل البريد الالكتروني");
			}
			if (password === "") {
				setError("الرجاء ادخل كلمة المرور");
				throw new Error("الرجاء ادخل كلمة المرور");
			}

			const { data, error: authError } = await supabase.auth.signInWithPassword(
				{
					email,
					password,
				}
			);

			if (authError) throw authError;

			if (data.session) {
				navigate("/admin/home");
			}
		} catch (err: unknown) {
			setError((err as Error).message || "حدث خطأ اثناء عملية التسجيل");
		} finally {
			setLoading(false);
		}
	};

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (email === "") {
				setError("الرجاء ادخل البريد الالكتروني");
				throw new Error("الرجاء ادخل البريد الالكتروني");
			}
			if (password === "") {
				setError("الرجاء ادخل كلمة المرور");
				throw new Error("الرجاء ادخل كلمة المرور");
			}
			if (password.length < 6) {
				setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
				throw new Error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
			}

			const { data, error: signUpError } = await supabase.auth.signUp({
				email,
				password,
			});

			if (signUpError) throw signUpError;

			if (data.user) {
				// Show success message and switch to login
				setError("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.");
				setIsSignUp(false);
				setEmail("");
				setPassword("");
				// Clear success message after 5 seconds
				setTimeout(() => setError(""), 5000);
			}
		} catch (err: unknown) {
			setError((err as Error).message || "حدث خطأ اثناء عملية إنشاء الحساب");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<div className="flex justify-center flex-col items-center">
					<img src="/logo.png" alt="logo" className="w-24 h-24" />
					<h2 className="text-2xl font-bold">الكلية التقنية الادارية</h2>
					<p className="text-gray-500">ترحب بك من جديد</p>
				</div>
				{error && (
					<div
						className={`error text-center my-4 border py-2 rounded ${
							error.includes("تم إنشاء")
								? "border-green-400 bg-green-50"
								: "border-red-400 bg-red-50"
						}`}>
						<p
							className={
								error.includes("تم إنشاء") ? "text-green-600" : "text-red-600"
							}>
							{error}
						</p>
					</div>
				)}
				<form
					className="mt-8 space-y-6"
					onSubmit={isSignUp ? handleSignUp : handleLogin}>
					<div className="field">
						<label htmlFor="email">
							<img src="/assets/account_avatar.svg" alt="account_avatar" />
						</label>
						<input
							type="email"
							id="email"
							value={email}
							placeholder="البريد الإلكتروني"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="field relative">
						<label htmlFor="password">
							<img src="/assets/lock.svg" alt="lock" />
						</label>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={password}
							placeholder="كلمة المرور"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className="absolute left-[10px]"
							type="button"
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
						</button>
					</div>
					<div className="text-center mt-8">
						<button
							className="rounded-4xl border-2 border-blue-200 py-2 px-4 shadow cursor-pointer hover:bg-primary-blue hover:text-white transition-colors"
							type="submit"
							style={
								loading
									? { opacity: 0.8, cursor: "not-allowed" }
									: { background: "white", color: "black" }
							}
							disabled={loading}>
							{loading
								? isSignUp
									? "جاري إنشاء الحساب..."
									: "جاري التسجيل..."
								: isSignUp
								? "إنشاء حساب"
								: "تسجيل الدخول"}
						</button>
					</div>
					<div className="text-center mt-4">
						<button
							type="button"
							onClick={() => {
								setIsSignUp(!isSignUp);
								setError("");
								setEmail("");
								setPassword("");
							}}
							className="text-sm text-blue-600 hover:text-blue-800 underline">
							{isSignUp
								? "لديك حساب بالفعل؟ تسجيل الدخول"
								: "لا تملك حساب؟ إنشاء حساب جديد"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
