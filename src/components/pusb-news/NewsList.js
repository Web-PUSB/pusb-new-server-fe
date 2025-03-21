import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import { formatTime } from "../../utils/FormatTime"; // Adjust path as needed

const NewsList = ({ newss }) => {
  const columns = useMemo(
    () => [
      {
        headerName: "Title",
        field: "title",
        flex: 1,
        minWidth: 200,
        cellRenderer: (params) => {
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
        cellRenderer: (params) => {
          return (
            <div className="flex justify-center items-center h-full py-2">
              <img
                src={params.data.thumbnail}
                alt={params.data.title}
                className="h-20 w-20 object-cover"
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
        cellRenderer: (params) => {
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
        minWidth: 250,
        cellRenderer: (params) => {
          return (
            <div className="flex items-center h-full">
              <div className="line-clamp-3">
                {formatTime(params.data.publish_date)}
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 250,
        cellRenderer: (params) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <a
                href={`pusb-news/${params.data.id}`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Details
              </a>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <a
                href={`pusb-news/${params.data.id}/edit`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <FiEdit className="h-5 w-5" />
              </a>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <a
                href="#"
                className="font-medium text-red-600 hover:underline dark:text-cyan-500"
              >
                <FiTrash className="h-5 w-5" />
              </a>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  // Define grid options
  const gridOptions = {
    rowHeight: 100, // Set each row's height to 100 pixels
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50],
  };

  // Define default column definitions
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
