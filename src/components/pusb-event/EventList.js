import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import ContainerEventStatus from "./ContainerEventStatus";
import { formatTime } from "../../utils/FormatTime";

const EventList = ({ events }) => {
  const columns = useMemo(
    () => [
      {
        headerName: "Name",
        field: "name",
        flex: 1,
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.name}</div>
          </div>
        ),
      },
      {
        headerName: "Image",
        field: "thumbnail",
        minWidth: 200,
        cellRenderer: (params) => (
          <div className="flex justify-center items-center h-full py-2">
            <img
              src={params.data.thumbnail}
              alt={params.data.name}
              className="h-20 w-20 object-cover"
            />
          </div>
        ),
        sortable: false,
        filter: false,
      },
      {
        headerName: "Period",
        field: "period",
        minWidth: 200,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.period}</div>
          </div>
        ),
      },
      {
        headerName: "Audience",
        field: "audience",
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">{params.data.audience}</div>
          </div>
        ),
      },
      {
        headerName: "Start Date",
        field: "start_date",
        sortable: true,
        filter: "agDateColumnFilter",
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">
              {formatTime(params.data.start_date)}
            </div>
          </div>
        ),
        minWidth: 250,
      },
      {
        headerName: "End Date",
        field: "end_date",
        sortable: true,
        filter: "agDateColumnFilter",
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <div className="line-clamp-3">
              {formatTime(params.data.end_date)}
            </div>
          </div>
        ),
        minWidth: 250,
      },
      {
        headerName: "Status",
        field: "status",
        sortable: false,
        filter: false,
        flex: 1,
        minWidth: 150,
        cellRenderer: (params) => <ContainerEventStatus event={params.data} />,
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 250,
        cellRenderer: (params) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <button
              onClick={() =>
                window.location.href = `/pusb-events/${params.data.id}/details`
              }
              className="px-4 py-4 text-sm font-medium text-cyan-600 hover:underline"
            >
              Details
            </button>
            <button
              onClick={() =>
                window.location.href = `/pusb-events/${params.data.id}/edit`
              }
              className="px-4 py-4 text-sm font-medium text-cyan-600 hover:underline"
            >
              <FiEdit className="h-5 w-5" />
            </button>
            <button
              onClick={() => alert(`Delete event ${params.data.id}`)}
              className="px-4 py-4 text-sm font-medium text-red-600 hover:underline"
            >
              <FiTrash className="h-5 w-5" />
            </button>
          </div>
        ),
      },
    ],
    []
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

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      period: PropTypes.string.isRequired,
      audience: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventList;
