import React, { useMemo, useCallback } from "react";
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
import { Users } from "@/src/types/pusb-user-type";

const UserList = ({
  users,
  loading,
  token,
}: {
  users: Users[];
  loading: boolean;
  token: string | undefined;
}) => {
  const columns: ColDef<Users>[] = useMemo(
    () => [
      {
        headerName: "Username",
        field: "name",
        sortable: true,
        filter: true,
        minWidth: 150,
      },
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: true,
        minWidth: 200,
      },
      {
        headerName: "Role",
        field: "role",
        sortable: true,
        filter: true,
        minWidth: 150,
      },
      {
        headerName: "Ministry",
        field: "ministry_id",
        sortable: true,
        filter: true,
        minWidth: 50,
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams) => (
          <div className="w-full flex justify-center items-center h-full gap-2">
            <div className="px-4 py-4 text-sm whitespace-nowrap">
              <Link
                href={`pusb-user/${params.data.id}/edit`}
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
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 25, 50],
      onGridReady,
      onGridSizeChanged,
    }),
    [onGridReady, onGridSizeChanged],
  );

  if (loading) {
    console.log(token);
    return <p>Loading...</p>;
  }

  return (
    <div className="ag-theme-alpine w-full h-[500px]">
      <AgGridReact
        gridOptions={gridOptions}
        rowData={users}
        columnDefs={columns}
        onGridReady={onGridReady}
        onGridSizeChanged={onGridSizeChanged}
      />
    </div>
  );
};

export default UserList;
