import React from "react";
import Link from "next/link";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import JobdescList from "./JobdescList";
const ContainerJobdescList = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold pt-2 pb-4">Jobdesc List</h2>
      <div className="w-full flex justify-end">
        <Link href={`jobdesc/create`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <JobdescList />
    </>
  );
};

export default ContainerJobdescList;
