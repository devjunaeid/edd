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
import "../Table/style.css";
import DebouncedInput from "../DebouncedInput";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useRecoilState } from "recoil";
import { getAllSubscriber } from "@/server/action";
import CopyBtn from "../CopyBtn/CopyBtn";
import { subsList } from "@/lib/atoms/subsList";

const columnHelper = createColumnHelper();
const date = new Date();

// Csv Exporter Config
const csvConfig = mkConfig({
  fieldSeparator: ",",
  filename: "MailingList" + date.toLocaleDateString(), // file name (without .csv)
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

// Fuzzy Search in the table.
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

function SubsList() {
  const [filterRows, setFilterRows] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [subs, setSubs] = useRecoilState(subsList);
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Sl.",
        cell: ({ row }) => {
          return row.index + 1;
        }, //RDT provides index by default
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("sub_date", {
        header: "Subscribes At",
        cell: ({ row }) => {
          const date = new Date(row.original.sub_date);
          return date.toLocaleDateString();
        },
      }),
      columnHelper.accessor("id", {
        header: "Copy",
        cell: ({ row }) => {
          return <CopyBtn email={row.original.email} />;
        },
      }),
    ],
    []
  );
  useEffect(() => {
    const getAll = async () => {
      let data = await getAllSubscriber();
      setSubs(data);
    };
    if (subs.length == 0) {
      getAll();
    }
  }, []);

  const table = useReactTable({
    data: subs,
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

  // make CSV rows.
  const makeCSVRows = (row) => {
    const date = new Date(row.original.sub_date);
    const uuid = row.original.id;

    return {
      Id: uuid.toString(),
      email: row.original.email,
      date: date.toLocaleDateString(),
    };
  };

  // export function
  const exportExcel = (rows) => {
    const filteredData = [];
    rows.map((row) => filteredData.push(makeCSVRows(row)));
    console.log(filteredData);
    const csv = generateCsv(csvConfig)(filteredData);
    download(csvConfig)(csv);
  };
  return (
    <div className="table_component">
      <div className="tableTop">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
        <button
          type="button"
          onClick={() => exportExcel(table.getRowModel().rows)}
        >
          Download CSV
        </button>
      </div>
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
                              header.getContext()
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
                          cell.getContext()
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

export default SubsList;
