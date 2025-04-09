import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/sessionContext";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useSession(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (email === "admin@gmail.com" && password === "password") {
        login(); 

        Swal.fire({
          title: "Success",
          text: "Logged in successfully",
          icon: "success",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });

        navigate("/admin/pusb"); 
      } else {
        Swal.fire({
          title: "Invalid Login",
          text: "Invalid email or password. Please try again.",
          icon: "error",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
        timer: 3000,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-lg space-y-4 px-4"
    >
      <div>
        <label htmlFor="email" className="text-sm text-white mb-2 block">
          Your Email
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm text-black"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-sm text-white mb-2 block">
          Your Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm text-black"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={`w-full bg-blue-500 py-2 text-sm font-medium text-white rounded-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
