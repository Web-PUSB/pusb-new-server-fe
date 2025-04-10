"use client";
import React, { useState, useEffect } from "react";
import Widget from "@/pusb-admin/components/pusb-dashboard/Widget";
import { FiUsers } from "react-icons/fi";
import ContainerUserList from "@/src/components/pusb-user/user/ContainerUserList";
import { useSession, signOut } from "next-auth/react";
import AccessRetristected from "@/pusb-admin/components/shared/AccessRetristected";
import { useRouter } from "next/navigation";
import { Users } from "@/src/types/pusb-user-type";
import { GetPUSBUsers } from "@/src/pages/api/pusb-user";

const ContainerUser = () => {
  const { data: session } = useSession();
  const role: string | undefined = session?.user?.role;
  const token: string | undefined = session?.user?.accessToken;
  const router = useRouter();
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Properly filter users by role
  const superAdminUserRole = users.filter(
    (user) => user.role === "SuperAdmin",
  ).length;
  const adminUserRole = users.filter((user) => user.role === "Admin").length;
  const userRole = users.filter((user) => user.role === "User").length;
  const userTotal = users.length;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const data = await GetPUSBUsers(token);
          console.log(data);
          setUsers(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Token is undefined");
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = confirm("Are you sure you want to log out?");
      if (response) {
        // response is true if user clicks "OK"
        await signOut();
        alert("Successfully logged out.");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle loading and access restricted logic properly
  if (loading) {
    return <p>Loading...</p>;
  }

  if (role !== "SuperAdmin") {
    return <AccessRetristected handleLogout={handleLogout} />;
  }

  return (
    <>
      <div className="mt-4 text-justify">
        Manage and maintain user records efficiently PUSB. Add, update, or
        remove users to ensure accurate and up-to-date organizational data.
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6">
        <Widget
          icon={<FiUsers className="h-7 w-7 text-blue-700" />}
          title={"Super Admin Role"}
          subtitle={`${superAdminUserRole} users`}
        />
        <Widget
          icon={<FiUsers className="h-6 w-6" />}
          title={"Admin Role"}
          subtitle={`${adminUserRole} users`}
        />
        <Widget
          icon={<FiUsers className="h-7 w-7" />}
          title={"User Role"}
          subtitle={`${userRole} users`}
        />
        <Widget
          icon={<FiUsers className="h-6 w-6" />}
          title={"OnGoing"}
          subtitle={`${userTotal} users`}
        />
      </div>
      <ContainerUserList users={users} loading={loading} token={token} />
    </>
  );
};

export default ContainerUser;
