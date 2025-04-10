import React from "react";
import MainWorkplanList from "./WorkplanList";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { Workplan } from "@/src/types/pusb-workplan.type";

const ContainerWorkplanList = ({ Workplan }: { Workplan: Workplan[] }) => {
  return (
    <div className="w-full mt-8">
      <div className="w-full flex justify-between  my-4">
        <h2 className="text-3xl font-semibold pt-2 pb-4">Main Workplan List</h2>
        <Link href={`pusb-profile/Workplan/create`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <MainWorkplanList Workplans={Workplan} />
    </div>
  );
};

export default ContainerWorkplanList;
