import React, { useEffect, useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { TbTextWrapDisabled, TbTextWrap, TbLogout } from "react-icons/tb";
import { NavbarBtn } from "./NavbarBtn";
import Avatar from "../Avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/User/slice/userSlice";

export default function Navbar() {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isExtend, setIsExtend] = useState(false);
  const { conversationId } = useParams();

  const activeConversationPath = conversationId ? `d/${conversationId} ` : "";
  return (
    <aside
      className={`flex flex-col justify-between p-2  ${isExtend && "w-1/6"}`}
    >
      <nav className="flex flex-col ">
        <NavbarBtn
          to={`${activeConversationPath}`}
          icon={<BsFillChatFill />}
          name={"Chats"}
          isExtend={isExtend}
        />

        <NavbarBtn
          to={`active/${activeConversationPath}`}
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
                  dispatch(setUser(null));
                  navigate("/login");
                  localStorage.clear();
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
