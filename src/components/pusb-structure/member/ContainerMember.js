import Image from "next/image";
import React from "react";
import sample from "@/public/images/avatar4.png";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import Link from "next/link";
const ContainerMember = () => {
  return (
    <section className="mt-4">
      <div className="mt-8 xl:mt-12 w-full flex justify-center">
        <div className="grid w-full lg:w-4/5 grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3 flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              Member Data
            </h1>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              MemberName
            </h1>
            <h1 className="text-sm font-semibold text-gray-900 lg:text-lg dark:text-white mt-2">
              isMember? isMinister? isExe? of minster
            </h1>
            <div>
              <ul className="flex items-center gap-4">
                <li>
                  <Link
                    href={`localhost:3000`}
                    className="flex flex-col justify-center items-center"
                  >
                    <FiLinkedin className="w-6 h-6" />
                    <div className="font-bold">Linkend</div>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`localhost:3000`}
                    className="flex flex-col justify-center items-center"
                  >
                    <FiInstagram className="w-6 h-6" />
                    <div className="font-bold">Instagram</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full  flex justify-center items-center">
            <Image
              className="w-[8rem] h-[8rem] flex-shrink-0 object-cover xl:w-[12rem] xl:h-[12rem] rounded-full"
              src={sample}
              alt="logo image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContainerMember;
