import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@/components/ui";
import { mergeClasses } from "@/lib/tailwindUtils";

const statusColors: Record<string, string> = {
	Processed: "bg-status-success/20 text-status-success",
	"Ignored by rule": "bg-status-alert/20 text-status-alert",
	Pending: "bg-status-warning/20 text-status-warning",
};

const categoryColors: Record<string, string> = {
	Invoice: "bg-yellow-600",
	Meeting: "bg-purple-600",
	"N/A": "bg-gray-600",
	Informative: "bg-blue-600",
};

function DynamicTableColumns<T extends object>(data: T[]): ColumnDef<T>[] {
	if (!data || data.length === 0) return [];

	return Object.keys(data[0] ?? {}).map((key) => {
		if (key === "category") {
			return {
				accessorKey: key,
				header: key.toUpperCase(),
				cell: (info) => (
					<Tag
						text={info.getValue() as string}
						size={"sm"}
						className={mergeClasses(categoryColors[info.getValue() as string])}
					/>
				),
			};
		}
		if (key === "status") {
			return {
				accessorKey: key,
				header: key.toUpperCase(),
				cell: (info) => {
					const value = info.getValue() as string;
					return (
						<span className={mergeClasses("rounded px-2 py-1 text-xs font-medium", statusColors[value])}>{value}</span>
					);
				},
			};
		}
		return {
			accessorKey: key,
			header: key.toUpperCase(),
			cell: (info) => String(info.getValue() ?? ""),
		};
	});
}

export { DynamicTableColumns };
