
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button";
import { useState } from "react";
function Focus() {
    const [start, setStart] = useState(false);

	const [activeTab, setActiveTab] = useState("Monday");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<div className="w-full flex h-full pt-16 bg-green-50">
				<div className=" flex items-center w-full m-4">
					<div className="h-full  w-full max-w-xs  bg-gray-100 rounded-l-2xl px-4 hidden lg:block rounded-2xl">
						{" "}
						<h3 className="pt-4 scroll-m-20 text-xl font-semibold tracking-tight pb-4 ">
							Lets focus together ✨
						</h3>
                        <div className="w-full h-full flex flex-col items-center justify-center">
						<div
					className={`w-full absolute left-0 z-50 lg:relative ${
						isMenuOpen ? "block" : "hidden"
					} lg:block`}
				>
					<div className="flex flex-col items-start h-screen">
						<div className="flex w-full justify-between pb-10">
						
							<button
								type="button"
								onClick={toggleMenu}
								className="block lg:hidden"
							>
								{/* <Cross1Icon className="w-10 h-10 p-2 text-white" /> */}
							</button>
						</div>
						<div className="flex flex-col items-end h-[75vh] justify-center w-full gap-2 px-3 ">
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "Monday"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-zinc-400 hover:text-zinc-400 "
								}`}
								onClick={() => {
									handleTabClick("Monday");
									toggleMenu();
								}}
							>
								Monday
							</button>
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "Tuesday"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-zinc-400 hover:text-zinc-400 "
								}`}
								onClick={() => {
									handleTabClick("Tuesday");
									toggleMenu();
								}}
							>
								Tuesday
							</button>
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "Wednesday"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-zinc-400 hover:text-zinc-400 "
								}`}
								onClick={() => {
									handleTabClick("Wednesday");
									toggleMenu();
								}}
							>
								Wednesday
							</button>
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "Thursday"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-gray-400 hover:text-gray-400 "
								}`}
								onClick={() => {
									handleTabClick("Thursday");
									toggleMenu();
								}}
							>
								Thursday
							</button>
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "Friday"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-gray-400 hover:text-gray-400 "
								}`}
								onClick={() => {
									handleTabClick("Friday");
									toggleMenu();
								}}
							>
								Friday
							</button>
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === "Saturday"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-gray-400 hover:text-gray-400 "
								}`}
								onClick={() => {
									handleTabClick("Saturday");
									toggleMenu();
								}}
							>
								Saturday
							</button>
							<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg mb-10 ${
									activeTab === "Sunday"
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-gray-400 hover:text-gray-400 "
								}`}
								onClick={() => {
									handleTabClick("Sunday");
									toggleMenu();
								}}
							>
								Sunday
							</button>
							<div className=" flex gap-5">
							{start && ( 
								
									<Input type="text" placeholder="Whatcha studying?" />
								
								)}
 						
						<Button onClick={()=>{setStart(!start)}}>
  								{start ? <p>Start</p> : <p>End</p>}
							</Button>
							</div>
							<Button>Reset</Button>
						</div>
					</div>
				</div>
                        </div>
					</div>
					{/* other side */}
					<div className="w-full h-full flex flex-col items-center justify-around m-1 lg:m-10">
						<div className=" w-full h-screen overflow-scroll bg-gray-100 gap-y-2 p-2 rounded-2xl">
							<div className="flex flex-col gap-2">
								<h3 className="m-2 scroll-m-20 text-2xl font-semibold tracking-tight">
									Tracker
								</h3>
								<Table>
  <TableCaption>Manage your time well. Happy studies!</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="">Start time</TableHead>
	  <TableHead className="">Total time</TableHead>
      <TableHead>Ending time</TableHead>
      <TableHead className=" w-[100px]">Subject</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    <TableRow>
      <TableCell className="font-medium">10:00 AM</TableCell>
      <TableCell>13:00 AM</TableCell>
	  <TableCell>2 hours</TableCell>

      <TableCell>Calculus</TableCell>
    </TableRow>
  </TableBody>
</Table>

								{/* <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
									<li>1st level of puns: 5 gold coins</li>
									<li>2nd level of jokes: 10 gold coins</li>
									<li>3rd level of one-liners : 20 gold coins</li>
								</ul> */}
							</div>
						</div>
						<div className="block lg:hidden">
							<Drawer>
								<DrawerTrigger>
									<Button>Choose Document</Button>
								</DrawerTrigger>
								<DrawerContent>
									<DrawerHeader>
										<DrawerTitle>Choose a Document</DrawerTitle>
										<DrawerDescription>
											Choose a Document from the list below to get started.
										</DrawerDescription>
									</DrawerHeader>
									<div className=" flex items-center jus w-full m-4">
										<div className="h-full  w-full max-w-xs   px-4">
											{" "}
											{/* <ImageListTile
                        Icon={<FileTextIcon className="scale-150" />}
                      /> */}
										</div>
									</div>
									<DrawerFooter>
										<Button>Submit</Button>
										<DrawerClose>
											<Button variant="outline">Cancel</Button>
										</DrawerClose>
									</DrawerFooter>
								</DrawerContent>
							</Drawer>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Focus;
