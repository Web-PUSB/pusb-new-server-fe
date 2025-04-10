import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import WorkplanList from "./CnCWorkPlanList";
const ContainerCnCWorkplanList = ({ cncId }: { cncId: string }) => {
  return (
    <>
      <div className="mt-4 mb-8 w-full flex justify-end">
        <Link href={`details/create-Workplan-cnc`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <WorkplanList cncId={cncId} />
    </>
  );
};

export default ContainerCnCWorkplanList;
