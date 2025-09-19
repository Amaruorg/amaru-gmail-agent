"use client";

import { Button, Input, Tag } from "@/components/ui/";
import { Google, Settings, Book, List, CheckList, Amaru, AmaruOutline } from "@/components/Icons";

export default function TestPage() {
	return (
		<div className="flex-col">
			<div className="p-2 flex items-center">
				<Button icon={Google} style="danger" variant="solid" size="sm" />

				<Button text="Google" icon={Google} variant="outline" size="md" />
				<Button text="Google" variant="ghost" size="sm" />
				<Button text="Google" variant="link" size="sm" />
			</div>
			<div>
				<Button text="Google" icon={Google} variant="solid" size="sm" />
				<Button text="Google" icon={Google} variant="solid" />
				<Button text="Google" icon={Google} variant="solid" size="lg" />
			</div>
			<div className="p-2">
				<Input
					variant={"outline"}
					buttonVariant={"solid"}
					placeholder="Search..."
					onChange={() => {
						console.log("Search...");
					}}
				/>
			</div>
			<div className="p-2 flex items-center gap-5">
				<Tag icon={Book} size="sm" className="bg-red-700" />
				<Tag icon={List} size="sm" className="bg-red-700" />
				<Tag icon={CheckList} size="sm" className="bg-red-700" />
				<Tag icon={Settings} size="sm" className="bg-red-700" />
				<Tag icon={Amaru} size="lg" className="bg-red-700" />
				<Tag text="Example Tag" size="sm" className="bg-sky-700" />
				<Tag text="Example Tag" icon={Google} size="sm" className="bg-green-700" />
			</div>
			<div className="p-2 flex items-center gap-5">
				<Tag text="Example Tag" size="sm" className="bg-purple-700" />
				<Tag text="Example Tag" size="md" className="bg-purple-700" />
				<Tag text="Example Tag" size="lg" className="bg-purple-700" />
			</div>
			<div className="">
				<Amaru className="text-white" width={200} height={200} />
				<AmaruOutline className="stroke-white" width={200} height={200} />
			</div>
		</div>
	);
}
