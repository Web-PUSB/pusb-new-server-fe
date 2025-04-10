"use client";
import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridOptions,
  ICellRendererParams,
  GridReadyEvent,
  GridSizeChangedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";
import { FiTrash, FiEdit } from "react-icons/fi";
import { News } from "@/src/types/pusb-news-type";
import { formatTime } from "@/pusb-admin/utils/FormatTime";
import Image from "next/image";

const NewsList = ({ newss }: { newss: News[] }) => {
  const columns: ColDef[] = useMemo(
    () => [
      {
        headerName: "Title",
        field: "title",
        flex: 1,
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">{params.data.title}</div>
            </div>
          );
        },
      },
      {
        headerName: "Thumbnail",
        field: "thumbnail",
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex justify-center items-center h-full py-2">
              <Image
                src={params.data.thumbnail}
                alt={params.data.title}
                width={100}
                height={100}
                layout="intrinsic"
                className="h-20 w-20"
              />
            </div>
          );
        },
        sortable: false,
        filter: false,
      },
      {
        headerName: "Category",
        field: "category",
        flex: 1,
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">{params.data.category}</div>
            </div>
          );
        },
      },

      {
        headerName: "Date Release",
        field: "publish_date",
        filter: "agDateColumnFilter",
        flex: 1,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">
                {formatTime(params.data.publish_date)}
              </div>
            </div>
          );
        },
        minWidth: 250,
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 250,
        cellRenderer: (params: ICellRendererParams) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href={`pusb-news/${params.data.id}`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Details
              </Link>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href={`pusb-news/${params.data.id}/edit`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <FiEdit className="h-5 w-5" />
              </Link>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href="#"
                className="font-medium text-red-600 hover:underline dark:text-cyan-500"
              >
                <FiTrash className="h-5 w-5" />
              </Link>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  // Define grid options
  const gridOptions: GridOptions = {
    rowHeight: 100, // Set each row's height to 100 pixels
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50],
  };

  // Define default column definitions
  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div className="ag-theme-alpine w-full h-[500px]">
      <AgGridReact
        gridOptions={gridOptions}
        defaultColDef={defaultColDef}
        rowData={newss}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        onGridReady={onGridReady}
        onGridSizeChanged={onGridSizeChanged}
      />
    </div>
  );
};

export default NewsList;
