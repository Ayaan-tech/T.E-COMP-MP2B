import React from "react";
import { NavLink } from "react-router-dom";
import GoogleTranslateWidget from "./GoogleTranslate";
// import GoogleTranslate from './GoogleTranslate';

function Navbar() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-green-600 cursor-pointer font-bold"
      : "cursor-pointer hover:text-green-600";
                                                                              
  return (
    <div className="flex justify-between items-center bg-gray-950 ">
      <div className="mt-6 ml-2 border-1 border-green-400 rounded-xl overflow-hidden ">
        <img className="h-20 w-70 " src="src/assets/logo.png" alt="Logo" />
      </div>
      <div className="text-white flex justify-between gap-5 text-3xl font-medium mr-7">
        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/features" className={linkClasses}>
          Features
        </NavLink>
        <NavLink to='/Dashboard' className={linkClasses}>Dashboard</NavLink>
      
        {/* <NavLink to="/settings" className={linkClasses}>Settings</NavLink> */}
        <div className="bg-white rounded-xl p-2 items-center border-1">
          <GoogleTranslateWidget />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
