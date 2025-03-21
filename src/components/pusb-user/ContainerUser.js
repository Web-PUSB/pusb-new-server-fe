import React, { useState, useEffect } from "react";
import Widget from "../../components/pusb-dashboard/Widget";
import { FiUsers } from "react-icons/fi";
import ContainerUserList from "../../components/pusb-user/user/ContainerUserList";
import AccessRestricted from "../../components/shared/AccessRestricted";
import { getPUSBUsers } from "../../pages/api/pusb-user";

const ContainerUser = () => {
  const [session, setSession] = useState({
    user: {
      role: "SuperAdmin", // Example role; replace with actual auth logic
      accessToken: "sample-token", // Example token; replace with actual token logic
    },
  });

  const role = session?.user?.role;
  const token = session?.user?.accessToken;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Properly filter users by role
  const superAdminUserRole = users.filter(
    (user) => user.role === "SuperAdmin"
  ).length;
  const adminUserRole = users.filter((user) => user.role === "Admin").length;
  const userRole = users.filter((user) => user.role === "User").length;
  const userTotal = users.length;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const data = await getPUSBUsers(token);
          console.log(data);
          setUsers(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Token is undefined");
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    const response = window.confirm("Are you sure you want to log out?");
    if (response) {
      // Clear session data or token (example)
      setSession(null);
      alert("Successfully logged out.");
      window.location.href = "/auth/signin"; // Redirect to login page
    }
  };

  // Handle loading and access restricted logic properly
  if (loading) {
    return <p>Loading...</p>;
  }

  if (role !== "SuperAdmin") {
    return <AccessRestricted handleLogout={handleLogout} />;
  }

  return (
    <>
      <div className="mt-4 text-justify">
        Manage and maintain user records efficiently at PUSB. Add, update, or
        remove users to ensure accurate and up-to-date organizational data.
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6">
        <Widget
          icon={<FiUsers className="h-7 w-7 text-blue-700" />}
          title="Super Admin Role"
          subtitle={`${superAdminUserRole} users`}
        />
        <Widget
          icon={<FiUsers className="h-6 w-6" />}
          title="Admin Role"
          subtitle={`${adminUserRole} users`}
        />
        <Widget
          icon={<FiUsers className="h-7 w-7" />}
          title="User Role"
          subtitle={`${userRole} users`}
        />
        <Widget
          icon={<FiUsers className="h-6 w-6" />}
          title="OnGoing"
          subtitle={`${userTotal} users`}
        />
      </div>
      <ContainerUserList users={users} loading={loading} token={token} />
    </>
  );
};

export default ContainerUser;
