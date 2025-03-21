import React from "react";
import FormMember from "../../../../../../components/pusb-structure/member/form/FormMember";

const Page = () => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Create New MemberData Data
        </h1>

        <p className="mt-4 text-gray-500 text-justify lg:text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <FormMember />
    </div>
  );
};

export default Page;
