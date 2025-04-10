import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";

import Link from "next/link";
import RoleList from "./RoleList";
const ContainerRoleList = ({ token }: { token: string }) => {
  return (
    <>
      <h2 className="text-3xl font-semibold pt-2 pb-4">Role List</h2>
      <div className="w-full flex justify-end mb-6">
        <Link href={`pusb-structure/create/minister`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>

      <RoleList token={token} />
    </>
  );
};

export default ContainerRoleList;
