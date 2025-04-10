import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import UserList from "./UserList";
import { Users } from "@/src/types/pusb-user-type";
const ContainerUserList = ({
  users,
  loading,
  token,
}: {
  users: Users[];
  loading: boolean;
  token: string | undefined;
}) => {
  return (
    <>
      <div className="mt-4 mb-8 w-full flex justify-end">
        <Link href={`pusb-user/create`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <UserList users={users} loading={loading} token={token} />
    </>
  );
};

export default ContainerUserList;
