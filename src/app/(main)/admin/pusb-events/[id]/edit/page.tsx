import React from "react";
import FormEvent from "@/pusb-admin/components/pusb-event/form/FormEvent";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Events</h1>
        <p className="mt-4 text-gray-500 text-justify lg:text-center">
          Edit the details of the existing events.
        </p>
      </div>
      <FormEvent isEditMode={true} id={params.id} />
    </div>
  );
};

export default Page;
