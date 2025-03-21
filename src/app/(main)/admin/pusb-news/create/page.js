import React from "react";
import FormNews from "../../../../../components/pusb-news/Form/FormNews";

const Page = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create News</h1>
        <p className="mt-4 text-gray-500 text-justify lg:text-center">
          Create a new news article today!
        </p>
      </div>
      <FormNews isEditMode={false} />
      {/* <FormNews /> */}
    </div>
  );
};

export default Page;
