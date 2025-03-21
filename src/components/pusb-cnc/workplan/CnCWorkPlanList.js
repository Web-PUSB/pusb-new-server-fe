import React, { useEffect, useMemo, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiTrash, FiEdit } from "react-icons/fi";

import { formatTime } from "../utils/FormatTime"; 
import CnCWorkplanModal from "./CnCWorkplanModal"; 
import ContainerCnCWorkplanStatus from "./ContainerCnCWorkplanStatus";

const WorkplanList = ({ cncId }) => {
  const [workplans, setWorkplans] = useState([]);

  useEffect(() => {
    const fetchWorkplan = async (cncId) => {
      try {
        const response = await fetch(`/api/pusb-cnc?cncId=${cncId}`);
        const data = await response.json();
        setWorkplans(data);
      } catch (error) {
        console.error("Error fetching workplans:", error);
      }
    };

    if (cncId) {
      fetchWorkplan(cncId);
    }
  }, [cncId]);

  const columns = useMemo(
    () => [
      {
        headerName: "Title",
        field: "title",
        flex: 1,
        minWidth: 150,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.title}</div>
          </div>
        ),
      },
      {
        headerName: "Period Event",
        field: "duration",
        minWidth: 150,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.duration}</div>
          </div>
        ),
      },
      {
        headerName: "Date",
        field: "date_parse",
        flex: 1,
        minWidth: 180,
        filter: "agDateColumnFilter",
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{formatTime(params.data.date_parse)}</div>
          </div>
        ),
      },
      {
        headerName: "Status",
        field: "status",
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        cellRenderer: (params) => (
          <ContainerCnCWorkplanStatus cncId={cncId} workplan={params.data} />
        ),
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 220,
        cellRenderer: (params) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <CnCWorkplanModal cncId={cncId} workplanId={params.data.id} />
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <a
                href={`details/${params.data.id}/edit`}
                className="font-medium text-cyan-600 hover:underline"
              >
                <FiEdit className="h-5 w-5" />
              </a>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <a
                href="#"
                className="font-medium text-red-600 hover:underline"
              >
                <FiTrash className="h-5 w-5" />
              </a>
            </div>
          </div>
        ),
      },
    ],
    [cncId]
  );

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const gridOptions = useMemo(
    () => ({
      rowHeight: 80,
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 25, 50],
      onGridReady,
      onGridSizeChanged,
    }),
    [onGridReady, onGridSizeChanged]
  );

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  return (
    <div className="h-[500px]">
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          gridOptions={gridOptions}
          defaultColDef={defaultColDef}
          rowData={workplans}
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
