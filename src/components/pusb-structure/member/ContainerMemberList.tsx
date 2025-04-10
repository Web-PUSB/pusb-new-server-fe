import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import MemberList from "./MemberList";
import Link from "next/link";

const ContainerMemberList = ({ isMinister }: { isMinister: boolean }) => {
  return (
    <>
      <h2 className="text-3xl font-semibold pt-2 pb-4">Member List</h2>
      <div className="w-full flex justify-end mb-6">
        {isMinister ? (
          <Link href={`teammember/create`}>
            <Button>
              <FiPlus className="h-5 w-5 mr-4" />
              New
            </Button>
          </Link>
        ) : (
          <Link href={`pusb-structure/create/member`}>
            <Button>
              <FiPlus className="h-5 w-5 mr-4" />
              New
            </Button>
          </Link>
        )}
      </div>
      <MemberList isMinister={isMinister} />
    </>
  );
};

export default ContainerMemberList;
