import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import ChatLayout from "../ChatLayOut";

//Layout of protected routes
export default function MainLayout() {
  return (
    <div className="flex divide-x-2 divide-gray-600 divide-opacity-20 h-screen">
      <Navbar />
      <div className="min-w-max w-4/12 ">
        <Outlet />
      </div>
      <div className="h-full w-full min-w-max">
        <ChatLayout />
      </div>
    </div>
  );
}
