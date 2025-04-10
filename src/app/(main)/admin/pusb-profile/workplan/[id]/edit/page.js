import React from "react";
import { useParams } from "react-router-dom";
import FormWorkplan from "../../../../../../../components/pusb-profile/Workplan/form/FormWorkplan";

const Page = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Workplan</h1>
        <p className="mt-4 text-gray-500 text-justify lg:text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <FormWorkplan id={id} isEditMode={true} />
    </div>
  );
};

export default Page;
