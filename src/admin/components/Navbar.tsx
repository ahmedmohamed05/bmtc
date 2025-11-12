export interface NavbarProps {
	email: string;
	logoutHandler: () => void;
}

export default function Navbar({ email, logoutHandler }: NavbarProps) {
	return (
		<nav className="bg-white shadow">
			<div className="container mx-auto">
				<div className="flex justify-between h-16">
					<div className="flex items-center gap-4">
						<h1 className="text-xl font-bold text-gray-800">{email}</h1>
					</div>
					<div className="flex items-center">
						<button
							onClick={logoutHandler}
							className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
							تسجيل خروج
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
