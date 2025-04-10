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
import { EventTimeline } from "@/src/types/pusb-event-type";
import { formatTime } from "@/src/utils/FormatTime";
import ModalTimeline from "./ModalTimeline";
import ContainerEventTimelineStatus from "./ContainerEventTimelineStatus";
const EventTimelineList = ({
  eventTimeline,
  eventId,
}: {
  eventId: string;
  eventTimeline: EventTimeline[];
}) => {
  const columns: ColDef<EventTimeline>[] = useMemo(
    () => [
      {
        headerName: "Name",
        field: "title",
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">{params.data.title}</div>
            </div>
          );
        },
      },
      {
        headerName: "Event Date",
        field: "event_date",
        minWidth: 200,
        filter: "agDateColumnFilter",
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">
                {formatTime(params.data.event_date)}
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Status",
        field: "status", // Added field property
        minWidth: 100,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <ContainerEventTimelineStatus
              eventId={eventId}
              eventTimeline={params.data}
            />
          );
        },
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 220,
        cellRenderer: (params: ICellRendererParams) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <ModalTimeline
                timelineId={params.data.id}
                timeline={params.data}
              />
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href={`details/${params.data.id}/edit`}
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
    [eventId],
  );
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const gridOptions: GridOptions = useMemo(
    () => ({
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
    <div className="h-[520px]">
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          gridOptions={gridOptions}
          defaultColDef={defaultColDef}
          rowData={eventTimeline}
          columnDefs={columns}
          pagination={true}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}
        />
      </div>
    </div>
  );
};

export default EventTimelineList;
