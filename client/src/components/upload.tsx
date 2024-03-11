import { db } from "@/lib/db";
import useStore from "@/lib/store";
import ky from "ky";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const getSummary = async (content: string) => {
	const resp = await ky.post(
		`${import.meta.env.VITE_BASE_URL}/describe`,
		{
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content }),
			timeout: false,
		},
	);
	const data = (await resp.json()) as { description: string };
	return data.description;
};

const getYoutubeLinks = async (content: string) => {
	const resp = await ky.get(
		encodeURI(
			`${import.meta.env.VITE_BASE_URL}/get_youtube_links?title=${content}`,
		),
		{ timeout: false },
	);
	const data = (await resp.json()) as { links: object[] };
	return data.links;
};

const getBooks = async (content: string) => {
	const resp = await ky.get(
		encodeURI(
			`${import.meta.env.VITE_BASE_URL}/get_books_recommendation?title=${content}`,
		),
		{ timeout: false },
	);
	const data = (await resp.json()) as { links: string[] };
	return data.links;
};

const generateMcqs = async (content: string) => {
	const resp = await ky.post(
		`${import.meta.env.VITE_BASE_URL}/generate_mcqs`,
		{
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content }),
			timeout: false,
		},
	);
	const data = (await resp.json()) as { processed_mcqs: object[] };
	return data.processed_mcqs;
};

function Upload() {
	const toastId = "upload-toast";
	const user = useStore((store) => store.user);

	async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		toast.loading("Uploading...", { id: toastId });

		try {
			const resp = await ky.post(
				`${import.meta.env.VITE_BASE_URL}/ocr`,
				{
					body: formData,
					timeout: false,
				},
			);

			const respData = (await resp.json()) as { processed_ocr: string };

			const ocr_content = respData.processed_ocr;

			toast.loading("Generating title", { id: toastId });

			const titleResponse = await ky.post(
				`${import.meta.env.VITE_BASE_URL}/generate_title`,
				{
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ content: ocr_content }),
					timeout: false,
				},
			);

			const titleData = (await titleResponse.json()) as { title: string };
			const title = titleData.title || "Untitled";

			toast.loading("Generating summary, links, books and mcqs", {
				id: toastId,
			});

			const [summary, links, books, mcqs] = await Promise.all([
				getSummary(ocr_content),
				getYoutubeLinks(title),
				getBooks(title),
				generateMcqs(ocr_content),
			]);

			const data = {
				summary,
				links,
				books,
				mcqs,
			};

			await db
				.from("uploads")
				.insert({ title, content: ocr_content, userId: user?.id, data })
				.single();

			toast.success("Uploaded", { id: toastId });
		} catch (error) {
			toast.error("Failed to upload", { id: toastId });
		}
	}

	return (
		<>
			<div className="flex flex-col w-full h-full justify-around items-center bg-[#F1F5F9]">
				<div className=" flex flex-col items-center justify-center px-10 h-[50vh] shadow-2xl rounded-2xl mx-5 sm:mx-5 lg:mx-0">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl font-montserrat text-sky-900 pb-12">
						Educative.ai
					</h1>
					<div className="text-lg font-semibold pb-7">Upload your file</div>
					<form className="space-y-4" onSubmit={handleUpload}>
						<Input
							type="file"
							name="file"
							multiple={false}
							className="flex items-center justify-center"
							accept="image/*"
							required
						/>
						<Button type="submit" className="w-full">
							Upload
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Upload;
