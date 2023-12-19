import React from "react";
import Logo from "../assets/magicbricks-logo.png";
import { useLocation, useNavigate } from "react-router-dom";

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
        <div className="flex items-center justify-between h-20 overflow-hidden bg-zinc-100 border-b shadow-md z-50 top-0 sticky">
          <div>
            <img
              src={Logo}
              alt=""
              className="h-48 w-auto lg:ml-24 sm:ml-12"
              onClick={() => navigate("/")}
            />
          </div>
          <ul className=" lg:mr-24 sm:mr-12 flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-zinc-950 transition-all border-b-red-600"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-zinc-950 transition-all border-b-red-600"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold transition-all text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/profile") && "text-zinc-950 transition-all border-b-red-600"
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
