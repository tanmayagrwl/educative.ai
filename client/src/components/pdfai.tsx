// @ts-nocheck

import ImageListTile from "./image-list-tile";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

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
import { db } from "@/lib/db";
import useStore from "@/lib/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { NotebookPen } from "lucide-react";
async function fetchUploads(userId: string) {
	const data = await db.from("ppts").select("*").eq("userId", userId);

	console.log(data.data);
	return data.data;
}

function Blackboard() {
	const [uploads, setUploads] = useState<object[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const user = useStore((store) => store.user);

	useEffect(() => {
		(async () => {
			const data = await fetchUploads(user?.id);
			setUploads(data || []);
		})();
	}, [user]);

	useEffect(() => {
		console.log(uploads);
	}, [uploads]);

	return (
		<div className="w-full flex h-full pt-16">
			<div className=" flex items-center w-full m-4">
				<div className="h-full  w-full max-w-xs  bg-gray-100 rounded-l-2xl px-4 hidden md:block">
					{" "}
					<h3 className="pt-4 scroll-m-20 text-xl font-semibold tracking-tight pb-4 ">
						Choose a PPT
					</h3>
					{uploads.map((upload, index) => (
						<ImageListTile
							key={upload.title}
							Icon={<NotebookPen className="w-10" />}
							text={upload.title}
							activeTab={activeIndex === index}
							handleTabClick={() => setActiveIndex(index)}
						/>
					))}
				</div>
				{/* other side */}
				<div className="w-full h-full flex flex-col items-center m-1 lg:m-10">
					<div className=" w-full bg-gray-100 gap-y-5 p-4 rounded-lg h-full">
						<div className="flex flex-col gap-2 p-4">
							<Label className="text-2xl font-bold" >Summary</Label>
							<p className="text-lg">
								{
									uploads[activeIndex]?.content
								}
							</p>

							<Accordion type="single" collapsible>
								<AccordionItem value="item1">
									<AccordionTrigger>
										<Label>Original Content</Label>
									</AccordionTrigger>
									<AccordionContent className="h-[400px] overflow-scroll">
										{uploads[activeIndex]?.original}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
						</div>
				</div>
			</div>
		</div>
	);
}

export default Blackboard;
