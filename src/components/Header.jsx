import React, { useEffect, useState } from "react";
import Logo from "../assets/magicbricks-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth"

export default function Header() {
  const [pageState,setPageState] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setPageState("Profile");
      }else{
        setPageState("Sign In");
      }
    })
  },[auth])
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div>
      <header>
        <div className="flex items-center justify-between h-[70px] bg-slate-400 shadow-md border-b sticky top-0 rounded-b-3xl">
          <div className="lg:ml-10 sm:ml-5 overflow-hidden">
            <img src={Logo} alt="" onClick={() => navigate("/")} className="lg:h-56 sm:h-44 overflow-hidden"/>
          </div>
          <ul className="lg:mr-10 sm:mr-5 flex space-x-5">
            <li onClick={() => navigate("/")} className={`text-base font-semibold text-gray-600 cursor-pointer  hover:text-zinc-800 transition-all  ${pathMatchRoute("/")&&"text-zinc-900 transition-all"}`}>Home</li>
            <li onClick={() => navigate("/offers")} className={`text-base font-semibold text-gray-600 cursor-pointer  hover:text-zinc-800 transition-all  ${pathMatchRoute("/offers")&&"text-zinc-900 transition-all"}`}>Offers</li>
            <li onClick={() => navigate("/profile")} className={`text-base font-semibold text-gray-600 cursor-pointer  hover:text-zinc-800 transition-all  ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&"text-zinc-900 transition-all"}`}>{pageState}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
