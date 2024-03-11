import { db } from "@/lib/db";
import useStore from "@/lib/store";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Blackboard from "./blackboard";
import DoubtSolver from "./doubt-solver";
import Pdfai from "./pdfai";
import { Button } from "./ui/button";
import Upload from "./upload";

function Dashboard() {
	const [activeTab, setActiveTab] = useState("Home");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const user = useStore((store) => store.user);

	return (
		<div className="w-screen h-screen">
			<div className="flex h-screen">
				{/* corrousel */}
				<div
					className={`w-full absolute left-0 z-50 lg:relative lg:w-[25vw] bg-zinc-900 ${
						isMenuOpen ? "block" : "hidden"
					} lg:block`}
				>
					<div className="flex flex-col items-start h-screen">
						<div className="flex w-full justify-between ">
							<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl font-montserrat text-white pt-4 ml-10">
							Educative.ai
							</h1>
							<button
								type="button"
								onClick={toggleMenu}
								className="block lg:hidden"
							>
								<Cross1Icon className="w-10 h-10 p-2 text-white" />
							</button>
						</div>
						<div className="flex flex-col items-end h-full justify-center w-full gap-2 px-3 ">
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "Home"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-zinc-400 hover:text-zinc-400 "
								}`}
								onClick={() => {
									handleTabClick("Home");
									toggleMenu();
								}}
							>
								Home
							</button>
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "blackboard.ai"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-zinc-400 hover:text-zinc-400 "
								}`}
								onClick={() => {
									handleTabClick("blackboard.ai");
									toggleMenu();
								}}
							>
								Educative.ai
							</button>

							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "doubtSolver.Ai"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-gray-400 hover:text-gray-400 "
								}`}
								onClick={() => {
									handleTabClick("doubtSolver.Ai");
									toggleMenu();
								}}
							>
								doubtSolver.Ai
							</button>
						</div>
					</div>
				</div>
				{/* dash sec 2 */}
				<div className="w-full relative">
					<div className="w-full flex items-center justify-between px-2 py-3 top-0 backdrop-blur bg-transparent z-40 border border-b border-gray-900 border-opacity-10 absolute">
						<button
							type="button"
							onClick={toggleMenu}
							className="block lg:hidden"
						>
							<HamburgerMenuIcon className="w-6 h-6" />
						</button>
						<h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
							{activeTab}
						</h1>
						<div className="flex  items-center gap-3 ">
							<h3 className="scroll-m-20 text-sm tracking-tight">
								{user?.user_metadata?.full_name}
							</h3>
							<img
								src={user?.user_metadata?.avatar_url ?? "/assets/userImage.png"}
								alt=""
								className="h-10 z-50 rounded-full"
							/>
							<Button
								onClick={async () => {
									await db.auth.signOut();
									location.href = "/";
								}}
							>
								Logout
							</Button>
						</div>
					</div>
					<div className=" h-screen overflow-hidden">
						{activeTab === "Home" && <Upload />}
						{activeTab === "blackboard.ai" && <Blackboard />}
						{activeTab === "PDF.Ai" && <Pdfai />}
						{activeTab === "doubtSolver.Ai" && <DoubtSolver />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
