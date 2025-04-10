import React from "react";
import PropTypes from "prop-types";
import FormCnC from "../../../../../../components/pusb-cnc/Form/FormCnC";

const Page = ({ match }) => {
  const { id } = match.params;

  return (
    <div className="mx-auto max-w-screen-xl px-4 mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit PUSB CNC data</h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <FormCnC isEditMode={true} id={id} />
    </div>
  );
};

Page.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Page;
