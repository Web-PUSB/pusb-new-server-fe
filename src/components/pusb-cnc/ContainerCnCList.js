import React from "react";
import CnCList from "../../components/pusb-cnc/CnCList"; // Adjust the import path as needed
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom"; // Use react-router-dom for routing
import { CNC } from "../../types/pusb-cnc-type"; // Adjust the import path as needed

const ContainerCnCList = ({ cncs }) => {
  return (
    <>
      <div className="mt-4 mb-8 w-full flex justify-end">
        <Link to="/pusb-cnc/create">
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <CnCList cncs={cncs} />
    </>
  );
};

export default ContainerCnCList;
