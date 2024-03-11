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
	const data = await db.from("uploads").select("*").eq("userId", userId);
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
						Choose an Image{" "}
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
					<div className=" w-full bg-gray-100 gap-y-5 p-2 rounded-lg ">
						<div className="flex flex-col gap-2">
							<Accordion type="single" collapsible>
								<AccordionItem value="item-1">
									<AccordionTrigger>Summary</AccordionTrigger>
									<AccordionContent>
										{uploads[activeIndex]?.data?.summary}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-2">
									<AccordionTrigger>Reference Videos</AccordionTrigger>
									<AccordionContent className="space-y-2">
										{uploads[activeIndex]?.data?.links?.map(
											({ id, channel, thumbnails, title }) => (
												<a
													key={id}
													href={`https://www.youtube.com/watch?v=${id}`}
													className="flex items-center gap-2 px-2 py-1 border bg-gray-100 rounded"
												>
													<img
														src={thumbnails[0]}
														alt=""
														className="h-10 w-10 object-cover"
													/>
													<div>
														<h4 className="text-sm font-semibold">{title}</h4>
														<p className="text-xs">{channel}</p>
													</div>
												</a>
											),
										)}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-3">
									<AccordionTrigger>Reference Books</AccordionTrigger>
									<AccordionContent>
										{uploads[activeIndex]?.data?.books?.map((book) => {
											const formattedBookName = new URL(book).pathname
												.split("/")
												.pop()
												?.replace(/-/g, " ");
											return (
												<a
													key={book}
													href={book}
													className="flex items-center gap-2 px-2 py-1 border bg-gray-100 rounded"
												>
													{formattedBookName}
												</a>
											);
										})}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-4">
									<AccordionTrigger>Test your Knowledge</AccordionTrigger>
									<AccordionContent className="h-[250px] overflow-scroll">
										{uploads[activeIndex]?.data?.mcqs?.map((mcq, index) => (
											<div key={String(index)}>
												<h3 className="my-2 scroll-m-20 text-xl font-semibold tracking-tight">
													{mcq.question}
												</h3>
												<RadioGroup defaultValue="option-one">
													{mcq.options.map((option, optionIndex) => (
														<div
															className="flex items-center space-x-2"
															key={String(optionIndex)}
														>
															<RadioGroupItem
																value={`option-${optionIndex + 1}`}
																id={`option-${optionIndex + 1}`}
															/>
															<Label htmlFor={`option-${optionIndex + 1}`}>
																{option}
															</Label>
														</div>
													))}
												</RadioGroup>
												<Button className="my-2">Submit</Button>
											</div>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
					<div className="block lg:hidden">
						<Drawer>
							<DrawerTrigger>
								<Button>Choose Image</Button>
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle>Choose an Image</DrawerTitle>
									<DrawerDescription>
										Choose an image from the list below to get started.
									</DrawerDescription>
								</DrawerHeader>
								<div className=" flex items-center jus w-full m-4">
									<div className="h-full  w-full max-w-xs   px-4">
										{" "}
										<ImageListTile
											Icon={
												<img
													src="/assets/board.jpeg"
													alt=""
													className="h-10 w-10 object-cover"
												/>
											}
										/>
									</div>
								</div>
								<Button>Submit</Button>
								<DrawerFooter>
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
	);
}

export default Blackboard;
