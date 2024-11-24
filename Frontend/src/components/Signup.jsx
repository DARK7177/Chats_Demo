import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../contextapi/AuthProvider";
import { Link } from "react-router-dom";

export default function Signup() {
  const { authUser, setAuthUser } = useAuth(); // Correctly destructuring from useAuth
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmpassword = watch("confirmpassword", "");

  const validatePasswordMatch = (value) => {
    return confirmpassword === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };

    await axios
      .post("/api/user/signup", userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Registration successful", response.data);
        alert("Registration successful! Please login.");
        localStorage.setItem("message", JSON.stringify(response.data)); // Storing the user data in localStorage
        setAuthUser(response.data); // Setting the user in context after successful registration
      })
      .catch((error) => {
        console.error("Request error:", error.message);
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-3 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl items-center text-blue-600 font-bold">
          Messenger
        </h1>
        <h2 className="text-2xl items-center">
          Create a New{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Username */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            {...register("fullname", { required: true })}
          />
        </label>
        {errors.fullname && (
          <span className="text-red-700 text-sm font-semibold">
            **This field is required**
          </span>
        )}

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-700 text-sm font-semibold">
            **This field is required**
          </span>
        )}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-700 text-sm font-semibold">
            **This field is required**
          </span>
        )}

        {/* Confirm Password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="confirm password"
            {...register("confirmpassword", {
              required: true,
              validate: validatePasswordMatch,
            })}
          />
        </label>
        {errors.confirmpassword && (
          <span className="text-red-700 text-sm font-semibold">
            {errors.confirmpassword.message}
          </span>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <input
            type="submit"
            value="Signup"
            className="text-white bg-blue-600 cursor-pointer w-full py-2 rounded-lg"
          />
        </div>
        <p>
          Have an account?{" "}
          <Link
            to={"/Login1"}
            className="text-blue-300 underline cursor-pointer m-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
