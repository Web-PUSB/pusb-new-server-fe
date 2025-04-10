import React from "react";
import FormCnCWorkplan from "@/src/components/pusb-cnc/Form/FormCnCWorkplan";

const Page = ({
  params,
}: {
  params: { id: string; WorkplanCncId: string };
}) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create PUSB CNC data</h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <FormCnCWorkplan
        cncId={params.id}
        WorkplanId={params.WorkplanCncId}
        isEditMode={true}
      />
    </div>
  );
};

export default Page;
