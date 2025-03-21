import React from "react";
import LoginForm from "@/src/components/auth/LoginForm";
const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Admin Login</h1>

        <p className="mt-4 text-base text-gray-500">
          Welcome to the PUSB Admin Panel. Please log in with your credentials
          to manage and oversee organizational activities efficiently.
        </p>
      </div>

      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
