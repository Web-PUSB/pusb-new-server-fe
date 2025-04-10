"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import Loader from "../shared/Loader";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result) {
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
          icon: "error",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        console.log("AAA", result);
        return;
      }

      if (result.error) {
        Swal.fire({
          title: "Invalid Login",
          text: "Invalid email or password. Please try again.",
          icon: "error",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Success",
          text: `Logged in successfully`,
          icon: "success",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        router.push("/admin/pusb");
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
      console.log("session error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-lg space-y-4 px-4"
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Your Email"
            className="text-sm text-white"
          />
        </div>
        <div>
          <TextInput
            type="email"
            className="w-full rounded-lg border-gray-200 text-sm shadow-sm text-black"
            placeholder="Enter email"
            value={email}
            rightIcon={FiMail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Your Password"
            className="text-sm text-white"
          />
        </div>
        <div className="relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            className="w-full rounded-lg border-gray-200 text-sm shadow-sm text-black"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute text-gray-500 font-bold right-3 top-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full inline-block rounded-lg bg-blue-500 py-2 text-sm font-medium text-white"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
