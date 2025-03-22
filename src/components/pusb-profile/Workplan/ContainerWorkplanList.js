import React from "react"; 
import PropTypes from "prop-types";
import MainWorkplanList from "./WorkplanList";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom"; 

const ContainerWorkplanList = ({ workplans }) => {
  return (
    <div className="w-full mt-8">
      <div className="w-full flex justify-between my-4">
        <h2 className="text-3xl font-semibold pt-2 pb-4">Main Workplan List</h2>
        <Link to="/pusb-profile/workplan/create">
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <MainWorkplanList workplans={workplans} />
    </div>
  );
};

ContainerWorkplanList.propTypes = {
  workplans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContainerWorkplanList;
