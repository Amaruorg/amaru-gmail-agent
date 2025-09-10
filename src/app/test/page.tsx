"use client";

import Button from "@/components/ui/Button";
import { Google } from "@/components/icons/Google";

export default function TestPage() {
	return (
		<div className="flex-col">
			<div className="p-2 flex items-center">
				<Button style="danger" variant="solid" size="sm" onlyIcon>
					<Google className="text-white" />
				</Button>
				<Button variant="outline" size="sm">
					<Google className="text-white" />
					Google
				</Button>
				<Button variant="ghost" size="sm">
					Google
				</Button>
				<Button variant="link" size="sm">
					Google
				</Button>
			</div>
			<div>
				<Button variant="solid" size="sm">
					<Google className="text-white" />
					Google
				</Button>
				<Button variant="solid">
					<Google className="text-white" />
					Google
				</Button>
				<Button variant="solid" size="lg">
					<Google className="text-white" />
					Google
				</Button>
			</div>
		</div>
	);
}
