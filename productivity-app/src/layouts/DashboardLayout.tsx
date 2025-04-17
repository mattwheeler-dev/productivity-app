import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

type DashboardLayoutProps = {
	children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<main className="flex-1 overflow-y-auto bg-gray-50 p-4">
					{children}
				</main>
			</div>
		</div>
	);
};
