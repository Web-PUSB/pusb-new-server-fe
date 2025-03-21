import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { FiTrash, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";  // Changed to useNavigate
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ContainerWorkplanStatus from "./ContainerWorkplanStatus";

const WorkplanList = ({ workplans }) => {
  const navigate = useNavigate();  // Changed to useNavigate

  const columns = useMemo(
    () => [
      {
        headerName: "Title",
        field: "title",
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full line-clamp-3">
            {params.data.title}
          </div>
        ),
      },
      {
        headerName: "Thumbnail",
        field: "thumbnail",
        minWidth: 200,
        cellRenderer: (params) => (
          <div className="flex justify-center items-center h-full">
            <img
              src={params.data.thumbnail}
              alt={params.data.title}
              width={100}
              height={100}
              className="h-20 w-20 object-cover"
            />
          </div>
        ),
        sortable: true,
        filter: false,
      },
      {
        headerName: "Description",
        field: "description",
        flex: 1,
        minWidth: 250,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.description}</div>
          </div>
        ),
      },
      {
        headerName: "Post",
        flex: 1,
        minWidth: 100,
        sortable: false,
        filter: false,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <button
              onClick={() =>
                navigate(`/pusb-profile/workplan/${params.data.id}/post`)  // Changed to navigate
              }
              className="font-medium text-cyan-600 hover:underline"
            >
              POST
            </button>
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
          <ContainerWorkplanStatus cnc={params.data} />
        ),
      },
      {
        headerName: "Actions",
        minWidth: 150,
        cellRenderer: (params) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <button
              onClick={() =>
                navigate(`/pusb-profile/workplan/${params.data.id}/edit`)  // Changed to navigate
              }
              className="font-medium text-cyan-600 hover:underline"
            >
              <FiEdit className="h-5 w-5" />
            </button>
            <button
              onClick={() => console.log(`Delete ${params.data.id}`)}
              className="font-medium text-red-600 hover:underline"
            >
              <FiTrash className="h-5 w-5" />
            </button>
          </div>
        ),
        flex: 1,
      },
    ],
    [navigate]  // Using navigate in the dependency array
  );

  const gridOptions = {
    rowHeight: 100,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50],
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

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
