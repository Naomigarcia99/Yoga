import React from "react";
import { NavLink } from "react-router-dom";

export default function navbar() {
  return (
    <nav className="bg-pink-100 fixed w-full top-0 start-0 border-b-2 border-red-300">
      <ul className="p-4 mt-5 font-medium border-gray-100 space-x-10">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/map"}>Map</NavLink>
        <NavLink to={"/calendar"}>Calendar</NavLink>
        <NavLink to={"/graphics"}>Graphics</NavLink>
      </ul>
    </nav>
  );
}
