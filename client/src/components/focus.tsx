import ImageListTile from "./image-list-tile";

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
import { Button } from "./ui/button";
import { useState } from "react";
function Focus() {
    const [start, setStart] = useState(false);

	return (
		<>
			<div className="w-full flex h-full pt-16 bg-green-50">
				<div className=" flex items-center w-full m-4">
					<div className="h-full  w-full max-w-xs  bg-gray-100 rounded-l-2xl px-4 hidden lg:block">
						{" "}
						<h3 className="pt-4 scroll-m-20 text-xl font-semibold tracking-tight pb-4 ">
							Lets focus together ✨
						</h3>
                        <div className="w-full h-full flex flex-col items-center justify-center">

                        </div>
					</div>
					{/* other side */}
					<div className="w-full h-full flex flex-col items-center justify-around m-1 lg:m-10">
						<div className=" w-full h-screen overflow-scroll bg-gray-100 gap-y-2 p-2 rounded-2xl">
							<div className="flex flex-col gap-2">
								<h3 className="m-2 scroll-m-20 text-2xl font-semibold tracking-tight">
									History
								</h3>

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
