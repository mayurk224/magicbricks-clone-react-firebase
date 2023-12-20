import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const myStyle = {
    backgroundImage:
      "url('https://images.pexels.com/photos/18578343/pexels-photo-18578343/free-photo-of-a-woman-in-a-white-dress-and-hat-walking-through-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')",
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <div className="flex justify-center items-center" style={myStyle}>
      <form className="w-96 flex flex-col bg-white p-10 rounded-2xl">
        <div className="mb-4">
          <h1 className="text-3xl text-center font-semibold">
            Sign in to your account
          </h1>
        </div>
        <div className="gap-4 flex flex-col">
          <div className="flex flex-col">
            <label className="text-lg">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              className="w-full rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChange}
              className="w-full rounded-xl"
            />
            <Link
              to="/forgot-password"
              className="text-sm flex flex-row-reverse cursor-pointer text-red-600"
            >
              Forget Password
            </Link>
          </div>
          <div className="flex justify-center gap-5">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
            <OAuth/>
          </div>
          <div className="flex py-3 items-center justify-center w-full">
            <hr className="w-64 h-1 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute cursor-default px-3 text-lg text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              or
            </span>
          </div>
          <div className="flex justify-center">
            <label className="text-sm">
              Dont have Account ?{" "}
              <Link to="/sign-up" className="text-red-500 cursor-pointer">
                Register Here
              </Link>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
