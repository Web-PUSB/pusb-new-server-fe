import React from "react";
import PropTypes from "prop-types";
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

ContainerUserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      status: PropTypes.bool,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default ContainerUserList;
