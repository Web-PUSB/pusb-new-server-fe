"use client";
import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ICellRendererParams,
  GridReadyEvent,
  GridSizeChangedEvent,
  GridOptions,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";
import { FiTrash, FiEdit } from "react-icons/fi";
import { Events } from "@/src/types/pusb-event-type";
import { formatTime } from "@/src/utils/FormatTime";
import Image from "next/image";
import ContainerEventStatus from "./ContainerEventStatus";

const EventList = ({ events }: { events: Events[] }) => {
  const columns: ColDef<Events>[] = useMemo(
    () => [
      {
        headerName: "Name",
        field: "name",
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">{params.data.name}</div>
            </div>
          );
        },
      },
      {
        headerName: "Image",
        field: "thumbnail",
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex justify-center items-center h-full py-2">
              <Image
                src={params.data.thumbnail}
                alt={params.data.name}
                width={500}
                height={500}
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
        headerName: "Period",
        field: "period",
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">{params.data.period}</div>
            </div>
          );
        },
      },
      {
        headerName: "Audience",
        field: "audience",
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">{params.data.audience}</div>
            </div>
          );
        },
      },
      {
        headerName: "Start Date",
        field: "start_date",
        sortable: true,
        filter: "agDateColumnFilter",
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">
                {formatTime(params.data.start_date)}
              </div>
            </div>
          );
        },
        minWidth: 250,
      },
      {
        headerName: "End Date",
        field: "end_date",
        sortable: true,
        filter: "agDateColumnFilter",
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">
                {formatTime(params.data.end_date)}
              </div>
            </div>
          );
        },
        minWidth: 250,
      },
      {
        headerName: "Status",
        field: "status", // Added field property
        sortable: false,
        filter: false,
        flex: 1,
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams) => {
          return <ContainerEventStatus event={params.data} />;
        },
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
                href={`pusb-events/${params.data.id}/details`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Details
              </Link>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href={`pusb-events/${params.data.id}/edit`}
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
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const gridOptions: GridOptions = useMemo(
    () => ({
      rowHeight: 100,
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 25, 50],
      onGridReady,
      onGridSizeChanged,
    }),
    [onGridReady, onGridSizeChanged],
  );

  // Define default column definitions
  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  return (
    <div className="h-[500px]">
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          gridOptions={gridOptions}
          defaultColDef={defaultColDef}
          rowData={events}
          columnDefs={columns}
          pagination={true}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}
        />
      </div>
    </div>
  );
};

export default EventList;
