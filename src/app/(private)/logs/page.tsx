"use client";

import { useEffect, useState } from "react";
import { Input, Table } from "@/components/ui";
import { type Log } from "@prisma/client";

type LogRow = Omit<Log, "id" | "userId" | "createdAt">;

export default function LogsPage() {
	const [data, setData] = useState<LogRow[]>([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		// Simulación de fetch local: /public/mails.json
		fetch("/data/logs_test.json")
			.then((res) => res.json())
			.then((json) => setData(json));
	}, []);
	console.log(data);

	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl">Logs</h1>
			<div className="flex items-center gap-2">
				<Input onChange={(e) => setSearchText(e.target.value)} placeholder="Search logs..." />
			</div>
			<Table<LogRow> data={data} searchText={searchText} />
		</div>
	);
}
