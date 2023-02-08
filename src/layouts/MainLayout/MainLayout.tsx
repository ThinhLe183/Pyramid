import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

//Layout of protected routes
export default function MainLayout() {
  //If fetch user failed

  return (
    <div className="flex divide-x-2 divide-gray-600 divide-opacity-20 h-screen ">
      <Navbar />
      <Outlet />
    </div>
  );
}
