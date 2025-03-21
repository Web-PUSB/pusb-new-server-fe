import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import UserList from "./UserList";

const ContainerUserList = ({ users, loading, token }) => {
  return (
    <>
      <div className="mt-4 mb-8 w-full flex justify-end">
        <a href="/pusb-user/create">
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </a>
      </div>
      <UserList users={users} loading={loading} token={token} />
    </>
  );
};

export default ContainerUserList;
