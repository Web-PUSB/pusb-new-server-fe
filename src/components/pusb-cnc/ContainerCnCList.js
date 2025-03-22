import React from "react";
import PropTypes from "prop-types";
import CnCList from "../../components/pusb-cnc/CnCList";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const cncShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired, 
});

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

ContainerCnCList.propTypes = {
  cncs: PropTypes.arrayOf(cncShape).isRequired,
};

export default ContainerCnCList;
