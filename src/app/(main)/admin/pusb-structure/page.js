import React, { useContext } from "react";
import ContainerRoleList from "../../../../components/pusb-structure/role/ContainerRoleList";
import Widget from "../../../../components/pusb-dashboard/Widget";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { useSession } from "../../../../context/sessionContext";

const Page = () => {
  const { session } = useContext(useSession);
  const token = session?.user?.accessToken;

  return (
    <div className="mt-8">
      <div className="mt-4 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        repudiandae in perspiciatis et expedita voluptatum consequuntur tempore
        numquam debitis quam. Totam dolore alias quam reprehenderit, doloribus
        nam natus dicta suscipit?
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-blue-700" />}
          title={"Total Minister"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Total Member LK"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Member PR"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total"}
          subtitle={"$574.34"}
        />
      </div>
      {token ? (
        <div className="mt-4">
          <ContainerRoleList token={token} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
