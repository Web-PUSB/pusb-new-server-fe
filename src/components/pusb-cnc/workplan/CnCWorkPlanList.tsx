"use client";
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  GridSizeChangedEvent,
  ICellRendererParams,
  GridOptions,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import { GetPUSBCNCWorkplanByCnCId } from "@/pusb-admin/pages/api/pusb-cnc";
import { WorkplanCNC } from "@/src/types/pusb-cnc-type";
import { formatTime } from "@/src/utils/FormatTime";
import Link from "next/link";
import CnCWorkplanModal from "./CnCWorkplanModal";
import ContainerCnCWorkplanStatus from "./ContainerCnCWorkplanStatus";

const WorkplanList = ({ cncId }: { cncId: string }) => {
  const [Workplans, setWorkplans] = useState<WorkplanCNC[]>([]);
  useEffect(() => {
    const fetchWorkplan = async (cncId: string) => {
      try {
        const Workplans = await GetPUSBCNCWorkplanByCnCId(cncId);
        setWorkplans(Workplans);
      } catch (error) {
        console.log(error);
      }
    };
    if (cncId) {
      fetchWorkplan(cncId);
    }
  }, [cncId]);
  const columns: ColDef<WorkplanCNC>[] = useMemo(
    () => [
      {
        headerName: "Title",
        field: "title",
        flex: 1,
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
        headerName: "Period Event",
        field: "duration",
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">{params.data.duration}</div>
            </div>
          );
        },
      },

      {
        headerName: "Date",
        field: "date_parse",
        flex: 1,
        minWidth: 180,
        filter: "agDateColumnFilter",
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">
                {formatTime(params.data.date_parse)}
              </div>
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
          return (
            <ContainerCnCWorkplanStatus cncId={cncId} Workplan={params.data} />
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
              <CnCWorkplanModal cncId={cncId} WorkplanId={params.data.id} />
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
    [cncId],
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const gridOptions: GridOptions = useMemo(
    () => ({
      rowHeight: 80,
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 25, 50],
      onGridReady,
      onGridSizeChanged,
    }),
    [onGridReady, onGridSizeChanged],
  );

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
