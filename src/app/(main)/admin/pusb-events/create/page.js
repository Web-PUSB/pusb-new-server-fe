import React from "react";
import FormEvent from "../../../../../components/pusb-event/form/FormEvent";

const Page = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create Event Data</h1>

        <p className="mt-4 text-gray-500 text-justify lg:text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <FormEvent />
    </div>
  );
};

export default Page;
