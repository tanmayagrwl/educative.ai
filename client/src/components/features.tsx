"use client";

import { Tabs } from "./ui/tabs";

export function TabsDemo() {
	const tabs = [
		{
			title: "Upload",
			value: "Upload",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Upload Tab</p>
					<img
						src="/assets/upload1.png"
						alt="dummy"
						width="1000"
						height="1000"
						className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
					/>
				</div>
			),
		},
		{
			title: "Educative",
			value: "Educative",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Notes tab</p>
					<img
						src="/assets/blackboard1.png"
						alt="dummy"
						width="1000"
						height="1000"
						className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
					/>
				</div>
			),
		},

		{
			title: "Doubt Solver",
			value: "Doubt Solver",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Doubt Solver tab</p>
					<img
						src="/assets/doubtSolver1.png"
						alt="dummy"
						width="1000"
						height="1000"
						className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
					/>
				</div>
			),
		},{
			title: "Summarizer",
			value: "Summarizer",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Summarizer tab</p>
					<img
						src="/assets/summarizer.png"
						alt="dummy"
						width="1000"
						height="1000"
						className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
					/>
				</div>
			),
		},{
			title: "Focus",
			value: "Focus",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Focus tab</p>
					<img
						src="/assets/focus.png"
						alt="dummy"
						width="1000"
						height="1000"
						className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
					/>
				</div>
			),
		},
	];

	return (
		<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10">
			<Tabs tabs={tabs} />
		</div>
	);
}
