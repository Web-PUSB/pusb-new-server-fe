import React from "react";
import CnCList from "@/pusb-admin/components/pusb-cnc/CnCList";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { CNC } from "@/pusb-admin/types/pusb-cnc-type";
const ContainerCnCList = ({ cncs }: { cncs: CNC[] }) => {
  return (
    <>
      <div className="mt-4 mb-8 w-full flex justify-end">
        <Link href={`pusb-cnc/create`}>
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
