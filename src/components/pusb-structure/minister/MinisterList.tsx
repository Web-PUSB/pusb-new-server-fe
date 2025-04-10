import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";
import { FiTrash, FiEdit } from "react-icons/fi";
import { Role } from "@/src/types/pusb-structure";
import { GetPUSBRole } from "@/pusb-admin/pages/api/pusb-structure";
const MinisterList = ({ token }: { token: string }) => {
  const [ministries, setMinistries] = useState<Role[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const data = await GetPUSBRole(token);
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministry data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinistry();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
          <TableHeadCell>Highlight</TableHeadCell>
          <TableHeadCell>Level</TableHeadCell>
          <TableHeadCell>Jobdesc</TableHeadCell>
          <TableHeadCell>Member</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {ministries && ministries.length > 0 ? (
            ministries.map((minister) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={minister.id}
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {minister.name}
                </TableCell>
                <TableCell>{minister.description}</TableCell>
                <TableCell>{minister.level}</TableCell>
                <TableCell>{minister.parent_id}</TableCell>
                <TableCell>
                  {" "}
                  <Link
                    href={`pusb-structure/minister 1/jobdesc`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Jobdesc
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`pusb-structure/minister 1/teammember`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Team
                  </Link>
                </TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="flex gap-4">
                  <Link
                    href={`pusb-structure/minister 1/edit`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <FiEdit className="h-5 w-5" />
                  </Link>
                  `
                  <Link
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-cyan-500"
                  >
                    <FiTrash className="h-5 w-5" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p>No rows data found....</p>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MinisterList;
