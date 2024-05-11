"use client";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getCoreRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

import { useState, useEffect, useMemo } from "react";
import "./style.css";
import DebouncedInput from "../DebouncedInput";
import CustomLink from "../CustomLink/CustomLink";
import { useRecoilState } from "recoil";
import { projectList } from "@/lib/atoms/projectList";
import { getAllStatus } from "@/server/action";

const columnHelper = createColumnHelper();

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function ReactTable() {
  const [filterRows, setFilterRows] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [projects, setProjects] = useRecoilState(projectList);
  const columns = useMemo(
    () => [
      columnHelper.accessor("project_id", {
        header: 'Sl.',
        cell: ({ row }) => { return row.index + 1 }  //RDT provides index by default
      }),
      columnHelper.accessor("project_id", {
        header: "Project ID",
      }),
      columnHelper.accessor("project_name", {
        header: "Project Name",
      }),
      columnHelper.accessor("client_name", {
        header: "Client",
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
      }),
      columnHelper.accessor("area", {
        header: "Area",
      }),
      columnHelper.accessor("date", {
        header: "Date",
      }),
      columnHelper.accessor("status", {
        header: "Running",
      }),
      columnHelper.accessor("project_id", {
        header: "Edit",
        cell: ({ row }) => {
          return <CustomLink row={row.original.project_id} />;
        },
      }),
    ],
    [],
  );
  useEffect(() => {
    const getAll = async () => {
      let data = await getAllStatus();
      setProjects(data);
    };
    if (projects.length == 0) {
      getAll();
    }
  }, []);

  const table = useReactTable({
    data: projects,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnOrderChange: setFilterRows,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    state: {
      filterRows,
      globalFilter,
    },
  });

  return (
    <div className="table_component">
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
      />
      <div className="table_cont">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th id={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="table_rows">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagiBtn">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ReactTable;
