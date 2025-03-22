import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { FiTrash, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ContainerCnCStatus from "./ContainerCnCStatus";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CnCList = ({ cncs }) => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        headerName: "Short Name",
        field: "short_name",
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.short_name}</div>
          </div>
        ),
      },
      {
        headerName: "Full Name",
        field: "full_name",
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.full_name}</div>
          </div>
        ),
      },
      {
        headerName: "Image",
        field: "image",
        minWidth: 200,
        cellRenderer: (params) => (
          <div className="flex justify-center items-center h-full">
            <img
              src={params.data.image}
              alt={params.data.short_name}
              className="h-24 w-24 object-cover"
            />
          </div>
        ),
        sortable: false,
        filter: false,
      },
      {
        headerName: "Category",
        field: "category",
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.category}</div>
          </div>
        ),
      },
      {
        headerName: "Highlight",
        field: "highlight",
        flex: 1,
        minWidth: 250,
        wrapText: true,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.highlight}</div>
          </div>
        ),
      },
      {
        headerName: "Description",
        field: "description",
        flex: 1,
        minWidth: 250,
        wrapText: true,
        sortable: false,
        filter: false,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.description}</div>
          </div>
        ),
      },
      {
        headerName: "Instagram",
        field: "instagram",
        flex: 1,
        minWidth: 250,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.instagram}</div>
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
        cellRenderer: (params) => <ContainerCnCStatus cnc={params.data} />,
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 250,
        cellRenderer: (params) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <button
                onClick={() => navigate(`/pusb-cnc/${params.data.id}/details`)}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Details
              </button>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <button
                onClick={() => navigate(`/pusb-cnc/${params.data.id}/edit`)}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <FiEdit className="h-5 w-5" />
              </button>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <button
                onClick={() => console.log(`Delete ${params.data.id}`)}
                className="font-medium text-red-600 hover:underline dark:text-cyan-500"
              >
                <FiTrash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ),
      },
    ],
    [navigate]
  );

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const gridOptions = useMemo(
    () => ({
      rowHeight: 100,
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
          rowData={cncs}
          columnDefs={columns}
          pagination={true}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}
        />
      </div>
    </div>
  );
};

CnCList.propTypes = {
  cncs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      short_name: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      instagram: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CnCList;
