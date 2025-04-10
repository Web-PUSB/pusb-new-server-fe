"use client";
import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridOptions,
  GridReadyEvent,
  GridSizeChangedEvent,
  ICellRendererParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";
import { FiTrash, FiEdit } from "react-icons/fi";
import { Workplan } from "@/pusb-admin/types/pusb-Workplan.type";
import Image from "next/image";
import ContainerWorkplanStatus from "./ContainerWorkplanStatus";

const WorkplanList = ({ Workplans }: { Workplans: Workplan[] }) => {
  const columns: ColDef<Workplan>[] = useMemo(
    () => [
      {
        headerName: "Title",
        field: "title",
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full line-clamp-3">
              {params.data.title}
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
            <div className="flex justify-center items-center h-full">
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
        sortable: true,
        filter: false,
      },
      {
        headerName: "Description",
        field: "description",
        flex: 1,
        minWidth: 250,
        wrapText: true,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className=" line-clamp-3">{params.data.description}</div>
            </div>
          );
        },
      },
      {
        headerName: "Post",
        flex: 1,
        minWidth: 100,
        wrapText: false,
        sortable: false,
        filter: false,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <Link
                href={`pusb-profile/Workplan/${params.data.id}/post`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                POST
              </Link>
            </div>
          );
        },
      },
      {
        headerName: "Status",
        field: "status",
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        cellRenderer: (params: ICellRendererParams) => {
          return <ContainerWorkplanStatus cnc={params.data} />;
        },
      },
      {
        headerName: "Actions",
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href={`pusb-profile/Workplan/${params.data.id}/edit`}
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
        flex: 1,
      },
    ],
    [],
  );

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
    <div className="h-[500px]">
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          gridOptions={gridOptions}
          defaultColDef={defaultColDef}
          rowData={Workplans}
          columnDefs={columns}
          pagination={true}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}
        />
      </div>
    </div>
  );
};

export default WorkplanList;
