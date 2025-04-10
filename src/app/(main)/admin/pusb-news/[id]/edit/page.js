import React from "react";
import { useParams } from "react-router-dom";
import FormNews from "../../../../../../components/pusb-news/Form/FormNews";

const Page = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-screen-xl px-4 mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit News</h1>
        <p className="mt-4 text-gray-500 text-justify lg:text-center">
          Edit the details of the existing news.
        </p>
      </div>
      <FormNews isEditMode={true} slug={id} />
      {/* <FormNews /> */}
    </div>
  );
};

export default Page;
