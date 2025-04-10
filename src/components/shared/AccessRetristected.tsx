import React from "react";
import Link from "next/link";
interface AccessRestrictedProps {
  handleLogout?: () => void;
}
const AccessRetristected = ({ handleLogout }: AccessRestrictedProps) => {
  return (
    <div className="w-full flex justify-center items-center h-80">
      <div className="text-center">
        <p className="text-lg font-semibold">Restricted Access</p>
        <p className="mt-2">
          You do not have the required permissions to access this page. Only
          Super Admins can view this section. Please{" "}
          <button
            onClick={handleLogout}
            className="text-blue-600 hover:underline"
          >
            log out
          </button>
          <span className="ml-1">
            with the appropriate credentials to proceed, or return to the{" "}
          </span>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AccessRetristected;
