import React, { useEffect, useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { TbTextWrapDisabled, TbTextWrap, TbLogout } from "react-icons/tb";
import Avatar from "../Avatar";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/User/slice/userSlice";
import { resetState } from "../../features/Conversation/slice/conversationSlice";

export default function Navbar() {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isExtend, setIsExtend] = useState(false);
  const { id } = useParams();
  return (
    <aside
      className={`flex flex-col justify-between p-2  ${isExtend && "w-1/6"}`}
    >
      <nav className="flex flex-col ">
        <NavbarBtn
          to={id ? `d/${id}` : ""}
          icon={<BsFillChatFill />}
          name={"Chats"}
          isExtend={isExtend}
        />

        <NavbarBtn
          to={id ? `active/d/${id}` : "active"}
          icon={<FaUserFriends />}
          name={"People"}
          isExtend={isExtend}
        />
      </nav>
      <div
        className={`flex items-center justify-between gap-2 ${
          isExtend ? "flex-row" : " flex-col"
        }`}
      >
        <div className="dropdown dropdown-right dropdown-end">
          <button
            className={`btn btn-sm  ${
              isExtend ? "btn-ghost normal-case gap-2 h-12" : "btn-circle"
            }`}
          >
            <Avatar extraClass="w-8" src={user?.avatar} />
            {isExtend && user?.name}
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow shadow-black bg-base-100 rounded-box w-72 text-white"
          >
            <li>
              <button
                onClick={() => {
                  dispatch(resetState());
                  dispatch(logout());
                  navigate("login");
                }}
              >
                <TbLogout />
                <p>Log out</p>
              </button>
            </li>
          </ul>
        </div>
        <button
          onClick={() => setIsExtend(!isExtend)}
          className="btn btn-sm btn-ghost btn-circle text-lg"
        >
          {isExtend ? <TbTextWrap /> : <TbTextWrapDisabled />}
        </button>
      </div>
    </aside>
  );
}
interface NavbarProps {
  isExtend: boolean;
  name: string;
  icon: JSX.Element;
  to: string;
}
function NavbarBtn({ isExtend, name, icon, to }: NavbarProps) {
  return (
    <div className={`${!isExtend && "tooltip tooltip-right"} `} data-tip={name}>
      <NavLink
        to={to}
        className={({ isActive }) => {
          return `btn btn-sm btn-ghost capitalize gap-4 h-10  ${
            isExtend ? "justify-start btn-block " : "btn-square w-10"
          } ${isActive && "btn-active text-white"}`;
        }}
      >
        <div className="indicator">
          <div className="text-lg">{icon}</div>
          {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
        </div>
        {isExtend ? name : ""}
      </NavLink>
    </div>
  );
}
