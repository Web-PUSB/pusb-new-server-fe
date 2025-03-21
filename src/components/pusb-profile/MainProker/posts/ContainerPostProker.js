import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import PostWorkplanList from "./PostWorkplanList";
const ContainerPostWorkplan = () => {
  return (
    <div className="w-full mt-8">
      <div className="w-full flex justify-between my-4">
        <h2 className="text-3xl font-semibold pt-2 pb-4">Post (Workplan) List</h2>
        <Link href={`Workplan 1/create-post`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <PostWorkplanList />
    </div>
  );
};

export default ContainerPostWorkplan;
