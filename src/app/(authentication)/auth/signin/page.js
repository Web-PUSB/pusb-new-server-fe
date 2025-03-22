import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../../context/sessionContext";
import LoginForm from "../../../../components/auth/LoginForm";

const Page = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLogin = () => {
    login(); 
    navigate("/pusb"); 
  };

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
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Page;
