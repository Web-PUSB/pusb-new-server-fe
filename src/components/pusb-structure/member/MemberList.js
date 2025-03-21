import React from "react";
import { FiInstagram, FiLinkedin, FiTrash, FiEdit } from "react-icons/fi";

const MemberList = ({ isMinister }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Major
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Minister
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sub Division
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Social Media
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Membership
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
              {'Apple MacBook Pro 17"'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Image</td>
            <td className="px-6 py-4 whitespace-nowrap">COMM</td>
            <td className="px-6 py-4 whitespace-nowrap">PRESIDENTIAL</td>
            <td className="px-6 py-4 whitespace-nowrap">President</td>
            <td className="px-6 py-4 whitespace-nowrap flex gap-2">
              <FiInstagram className="w-4 h-4 text-gray-500" />
              <FiLinkedin className="w-4 h-4 text-gray-500" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Active</td>
            <td className="px-6 py-4 whitespace-nowrap flex gap-4">
              {isMinister ? (
                <>
                  <a
                    href="teammember/member-1/details"
                    className="text-cyan-600 hover:underline"
                  >
                    Details
                  </a>
                  <a
                    href="teammember/member-1/edit"
                    className="text-cyan-600 hover:underline"
                  >
                    <FiEdit className="h-5 w-5" />
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="pusb-structure/details/member-1"
                    className="text-cyan-600 hover:underline"
                  >
                    Details
                  </a>
                  <a
                    href="pusb-structure/edit/member-1"
                    className="text-cyan-600 hover:underline"
                  >
                    <FiEdit className="h-5 w-5" />
                  </a>
                </>
              )}
              <a href="#" className="text-red-600 hover:underline">
                <FiTrash className="h-5 w-5" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
