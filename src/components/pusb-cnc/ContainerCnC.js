import React from "react";
import { Button } from "flowbite-react";
import { FiEdit, FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import ContainerCnCWorkplanList from "./workplan/ContainerCnCWorkPlanList";

const ContainerCnC = ({ cnc }) => {
  return (
    <section>
      {cnc && (
        <>
          <div className="w-full flex justify-between items-center">
            <div className="w-full">
              <h2 className="text-3xl font-bold text-gray-800">
                {cnc.short_name}
              </h2>
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                {cnc.full_name}
              </p>
              <p className="text-base font-medium text-gray-700 dark:text-gray-400">
                Category: {cnc.category}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <FiInstagram className="w-5 h-5" />
                <a
                  href={cnc.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-blue-600 hover:underline"
                >
                  {cnc.instagram}
                </a>
              </div>
              <div className="mt-4">
                <Link to={`/admin/pusb-cnc/edit/${cnc.id}`}>
                  <Button>
                    <FiEdit className="h-5 w-5 mr-4" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <img
                className="w-[14rem] h-[14rem] flex-shrink-0 object-contain xl:w-[18rem] xl:h-[18rem]"
                src={cnc.image}
                alt="logo image"
              />
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              Description CnC
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-justify">
              {cnc.description}
            </p>
          </div>

          <div className="space-y-3 mt-8">
            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              Highlight CnC
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-justify">
              {cnc.highlight}
            </p>
          </div>

          <ContainerCnCWorkplanList cncId={cnc.id} />
        </>
      )}
    </section>
  );
};

export default ContainerCnC;
