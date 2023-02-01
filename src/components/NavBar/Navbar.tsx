import React, { useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { TbTextWrapDisabled, TbTextWrap } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import NavbarBtn from "./NavbarBtn";

export default function Navbar() {
  const [isExtend, setIsExtend] = useState(false);
  return (
    <aside
      className={`flex flex-col justify-between p-2 ${
        isExtend && "basis-2/12"
      }`}
    >
      <nav className="flex flex-col ">
        <NavbarBtn
          to="/"
          icon={<BsFillChatFill />}
          name={"Chats"}
          isExtend={isExtend}
        />
        <NavbarBtn
          to="active"
          icon={<FaUserFriends />}
          name={"People"}
          isExtend={isExtend}
        />
      </nav>
      <div
        className={`flex justify-between ${
          isExtend ? "flex-row" : " flex-col"
        }`}
      >
        <button
          className={`btn btn-ghost normal-case gap-2 ${
            !isExtend && "btn-circle"
          }`}
        >
          <Avatar />
          {isExtend && "Messi"}
        </button>
        <button
          onClick={() => setIsExtend(!isExtend)}
          className="btn btn-ghost btn-circle text-xl"
        >
          {isExtend ? <TbTextWrap /> : <TbTextWrapDisabled />}
        </button>
      </div>
    </aside>
  );
}
