
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
import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { toast } from "sonner";
import useStore from "@/lib/store";

interface Session { day: string; start: Date; end: Date; subject: string } 

function formatTime(date: Date) {
	return date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

const weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const day = weeks[new Date().getDay() - 1].toLowerCase();

console.log(day);

function Focus() {
	const [subject, setSubject] = useState("");
    const [session, setSession] = useState<Session | null>();

	const [activeTab, setActiveTab] = useState(day);
	const [sessions, setSessions] = useState<Session[]>([]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const user = useStore((store) => store.user);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const fetchSessions = async () => {
		try {
			const response = await db.from("focus").select("*").eq("day", activeTab).eq("userId", user?.id);
			if (response.error) {
				toast.error(response.error.message);
				return;
			}

			const data = response.data as Session[];
			setSessions(data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchSessions();
	}, [activeTab])


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
							{weeks.map((day) => (
								<button
								type="button"
								className={`w-full py-2 px-4 text-xl font-medium flex items-center  rounded-lg ${
									activeTab === day.toLowerCase()
										? "text-white bg-zinc-800 hover:bg-zinc-700"
										: "text-zinc-400 hover:text-zinc-400 "
								}`}
								onClick={() => {
									handleTabClick(day.toLowerCase());
									toggleMenu();
								}}
							>
								{day}
							</button>
							))}
							<div className=" flex gap-5">
							<Input disabled={!!session?.start} type="text" placeholder="Whatcha studying?" onChange={(e) => {
								setSubject(e.target.value);
							}} value={subject} />


							{
								session?.start ? (
							<Button onClick={async ()=>{
									const end = new Date()
									const response = await db.from("focus").insert({
										...session,
										end,
										userId: user?.id,
									});
									if (response.error) {
										toast.error(response.error.message);
										return;
									}
									setSubject("");
									setSession(null);
									fetchSessions();
							}}>
									  Stop
								</Button>
									
								) : (
									<Button onClick={async ()=>{

										if (!subject.trim()) {
											toast.error("Please enter a subject");
											return;
										}
			
										setSession({
											subject,
											start: new Date(),
											end: new Date(),
											day,
										});
									}}>
											  Start
										</Button>
									
								)
							}
 						
							</div>
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
      <TableHead>Ending time</TableHead>
	  <TableHead className="">Total time</TableHead>
      <TableHead className=" w-[100px]">Subject</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
	{
		sessions.map((session, index) => {

			const startTime = new Date(session.start);
			const endTime = new Date(session.end);
			const diff = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);


			return (<TableRow key={index}>
				<TableCell className="font-medium">{formatTime(startTime)}</TableCell>
				<TableCell>{formatTime(new Date(session.end))}</TableCell>
				<TableCell className="font-medium">{diff} mins</TableCell>
				<TableCell>{session.subject}</TableCell>
			</TableRow>)
		})
	}
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
