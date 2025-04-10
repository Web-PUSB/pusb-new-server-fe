import React from "react";
import FormTimeline from "../../../../../../../../components/pusb-event/form/FormTimeline";

const Page = ({ params }: { params: { id: string; timelineId: string } }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Update PUSB Event Timeline data
        </h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <FormTimeline
        eventId={params.id}
        timelineId={params.timelineId}
        isEditMode={true}
      />
    </div>
  );
};

export default Page;
