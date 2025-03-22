import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import { getPUSBRole } from "../../../pages/api/pusb-structure";

const RoleList = ({ token }) => {
  const [ministries, setMinistries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await getPUSBRole(token);
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministry data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [token]);

  const columns = useMemo(
    () => [
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: true,
        minWidth: 150,
      },
      {
        headerName: "Description",
        field: "description",
        sortable: true,
        filter: true,
        minWidth: 200,
      },
      {
        headerName: "Highlight",
        field: "highlight",
        sortable: true,
        filter: true,
        minWidth: 150,
      },
      {
        headerName: "Level",
        field: "level",
        sortable: true,
        filter: true,
        minWidth: 100,
      },
      {
        headerName: "Jobdesc",
        sortable: false,
        filter: false,
        minWidth: 130,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <a
              href={`/pusb-structure/${params.data.id}/jobdesc`}
              className="font-medium text-cyan-600 hover:underline"
            >
              Jobdesc
            </a>
          </div>
        ),
      },
      {
        headerName: "Member",
        sortable: false,
        filter: false,
        minWidth: 100,
        cellRenderer: (params) => (
          <div className="flex items-center h-full">
            <a
              href={`/pusb-structure/${params.data.id}/teammember`}
              className="font-medium text-cyan-600 hover:underline"
            >
              Team
            </a>
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
          <div className="flex justify-center items-center h-full">
            {params.data.status ? "Active" : "Inactive"}
          </div>
        ),
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 250,
        cellRenderer: (params) => (
          <div className="flex justify-center items-center h-full gap-2">
            <a
              href={`/pusb-cnc/details/${params.data.id}`}
              className="font-medium text-cyan-600 hover:underline"
            >
              Details
            </a>
            <a
              href={`/pusb-structure/${params.data.id}/edit`}
              className="font-medium text-cyan-600 hover:underline"
            >
              <FiEdit className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="font-medium text-red-600 hover:underline"
              onClick={() => console.log("Delete", params.data.id)}
            >
              <FiTrash className="h-5 w-5" />
            </a>
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
      rowHeight: 50,
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 25, 50],
      onGridReady,
      onGridSizeChanged,
    }),
    [onGridReady, onGridSizeChanged]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

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
          rowData={ministries}
          columnDefs={columns}
          pagination={true}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}
        />
      </div>
    </div>
  );
};

RoleList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default RoleList;
