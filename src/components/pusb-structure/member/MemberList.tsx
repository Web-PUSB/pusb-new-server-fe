import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FiInstagram, FiLinkedin, FiTrash, FiEdit } from "react-icons/fi";
import Link from "next/link";
const MemberList = ({ isMinister }: { isMinister: boolean }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Image</TableHeadCell>
          <TableHeadCell>Major</TableHeadCell>
          <TableHeadCell>Minister</TableHeadCell>
          <TableHeadCell>Sub Division</TableHeadCell>
          <TableHeadCell>Social Media</TableHeadCell>
          {/* <TableHeadCell>Category</TableHeadCell> */}
          <TableHeadCell>Membership</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </TableCell>
            <TableCell>Image</TableCell>
            <TableCell>COMM</TableCell>
            <TableCell>PRESIDENTIAL</TableCell>
            <TableCell>President</TableCell>
            <TableCell className="flex gap-2">
              <FiInstagram className="w-4 h-4" />
              <FiLinkedin className="w-4 h-4" />
            </TableCell>
            <TableCell>Active</TableCell>
            <TableCell className="flex gap-4">
              {isMinister ? (
                <>
                  <Link
                    href={`teammember/member 1/details`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Details
                  </Link>
                  <Link
                    href={`teammember/member 1/edit`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <FiEdit className="h-5 w-5" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`pusb-structure/details/member 1`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Details
                  </Link>
                  <Link
                    href={`pusb-structure/edit/member 1`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <FiEdit className="h-5 w-5" />
                  </Link>
                </>
              )}
              <Link
                href="#"
                className="font-medium text-red-600 hover:underline dark:text-cyan-500"
              >
                <FiTrash className="h-5 w-5" />
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;
