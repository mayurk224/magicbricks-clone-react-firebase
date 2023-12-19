import React from "react";
import Logo from "../assets/magicbricks-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div>
      <header>
        <div className="flex items-center justify-between h-16 overflow-hidden bg-zinc-100 border-b shadow-md z-50 top-0 sticky">
          <div>
            <img
              src={Logo}
              alt=""
              className="h-48 w-auto lg:ml-24 sm:ml-12"
              onClick={() => navigate("/")}
            />
          </div>
          <ul className=" lg:mr-24 sm:mr-12 flex">
            <li
              className={`mx-4 cursor-pointer text-base font-semibold text-gray-400 hover:text-gray-600 transition-all border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") &&
                "text-black hover:text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`mx-4 cursor-pointer text-base font-semibold text-gray-400 hover:text-gray-600 transition-all border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") &&
                "text-black hover:text-black border-b-red-500"
              }` }
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`mx-4 cursor-pointer text-base font-semibold hover:text-gray-600 transition-all text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/profile") &&
                "text-black hover:text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              Profile
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
