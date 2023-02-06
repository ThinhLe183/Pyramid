import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import ChatLayout from "../ChatLayOut";

//Layout of protected routes
export default function MainLayout() {
  return (
    <div className="flex divide-x-2 divide-gray-600 divide-opacity-20 h-screen">
      <Navbar />
      <div className="grow flex h-full divide-x-2 divide-gray-600 divide-opacity-20">
        <div className="h-full w-[23rem] ">
          <Outlet />
        </div>
        <div className="grow">
          <ChatLayout />
        </div>
      </div>
    </div>
  );
}
