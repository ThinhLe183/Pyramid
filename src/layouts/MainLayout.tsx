import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import ChatLayout from "./ChatLayout";
import Navbar from "../components/NavBar/Navbar";
export default function MainLayout() {
  return (
    <div className="flex min-h-screen min-w-full ">
      <Navbar />
      <main className="bg-blue-500 basis-3/12">
        <Outlet />
      </main>
      <div className=" bg-red-600 flex-grow">
        <ChatLayout />
      </div>
    </div>
  );
}
