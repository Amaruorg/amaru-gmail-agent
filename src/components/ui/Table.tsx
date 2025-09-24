"use client";

import React from "react";
import { DynamicTableColumns } from "@/components/ui";
import { ArrowUp, ArrowDown } from "@/components/Icons";
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	SortingState,
	ColumnFiltersState,
	useReactTable,
} from "@tanstack/react-table";

type DataTableTanStackProps<T extends object> = {
	data: T[];
	searchText?: string;
	searchColumn?: string;
};

function Table<T extends object>({ data, searchText = "", searchColumn }: DataTableTanStackProps<T>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [filters, setFilters] = React.useState<ColumnFiltersState>([]);

	// aplicar filtro desde la prop searchText
	React.useEffect(() => {
		if (searchColumn && searchText !== undefined) {
			setFilters([{ id: searchColumn, value: searchText }]);
		} else {
			setFilters([]);
		}
	}, [searchText, searchColumn]);

	const table = useReactTable({
		data,
		columns: DynamicTableColumns(data),
		state: {
			sorting,
			columnFilters: filters,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	if (!data || data.length === 0) {
		return <p className="text-muted">No data available</p>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="border-muted min-w-full overflow-hidden rounded-lg border text-left text-sm text-gray-300">
				<thead className="bg-card-background text-xs text-gray-200 uppercase">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="border-muted/50 cursor-pointer border-b px-4 py-3 font-medium select-none"
									onClick={header.column.getToggleSortingHandler()}
								>
									<div className="flex items-center gap-2">
										{flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getIsSorted() === "asc" && <ArrowUp width={16} height={16} />}
										{header.column.getIsSorted() === "desc" && <ArrowDown width={16} height={16} />}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="bg-card-background/50">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="border-muted/50 hover:bg-background/60 border-b transition">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="px-4 py-3">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export { Table };
