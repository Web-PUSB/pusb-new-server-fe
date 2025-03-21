import React from "react";

const ContainerPictureNews = ({ name, image }) => {
  return (
    <>
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
          {name} News
        </h1>

        <p className="text-gray-500 dark:text-gray-300 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab
          nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <img
          className="w-[8rem] h-[8rem] flex-shrink-0 object-cover xl:w-[12rem] xl:h-[12rem] rounded-full"
          src={image}
          alt="logo image"
        />
      </div>
    </>
  );
};

export default ContainerPictureNews;
