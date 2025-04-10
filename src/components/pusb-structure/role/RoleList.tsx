import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  GridSizeChangedEvent,
  ICellRendererParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";
import { FiTrash, FiEdit } from "react-icons/fi";
import { Role } from "@/src/types/pusb-structure";
import { GetPUSBRole } from "@/pusb-admin/pages/api/pusb-structure";

const RoleList = ({ token }: { token: string }) => {
  const [ministries, setMinistries] = useState<Role[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await GetPUSBRole(token);
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministry data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [token]);

  const columns: ColDef<Role>[] = useMemo(
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
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <Link
                href={`pusb-structure/${params.data.id}/jobdesc`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Jobdesc
              </Link>
            </div>
          );
        },
      },
      {
        headerName: "Member",
        sortable: false,
        filter: false,
        minWidth: 100,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex items-center h-full">
              <Link
                href={`pusb-structure/${params.data.id}/teammember`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Team
              </Link>
            </div>
          );
        },
      },
      {
        headerName: "Status",
        field: "status", // Added field property
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <div className="flex justify-center items-center h-full line-clamp-3">
              {params.data.status ? "Active" : "Inactive"}
            </div>
          );
        },
        // valueGetter: (params: ICellRendererParams) =>
        //   params.data.status ? "Active" : "Inactive",
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
                href={`pusb-cnc/details/${params.data.id}`}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Details
              </Link>
            </div>
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href={`pusb-structure/${params.data.id}/edit`}
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

  const gridOptions = useMemo(
    () => ({
      rowHeight: 50,
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 25, 50],
      onGridReady,
      onGridSizeChanged,
    }),
    [onGridReady, onGridSizeChanged],
  );

  if (loading) {
    return <p>Loading...</p>;
  }

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
          defaultColDef={defaultColDef} // Apply default column definitions
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

export default RoleList;
