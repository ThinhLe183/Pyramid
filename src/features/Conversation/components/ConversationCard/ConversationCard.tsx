import React from "react";
import Avatar from "../../../../components/Avatar";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
//  active = bg-[#2c3d53]
//  hover =
const id = 1;
export default function ConversationCard() {
  return (
    <NavLink
      to={`d/${id}`}
      className={({ isActive }) =>
        `h-18 p-3 rounded-lg flex gap-4 items-center ${
          isActive
            ? "bg-[#2c3d53] hover:bg-none"
            : "hover:bg-gray-400 hover:bg-opacity-20 hover:cursor-pointer"
        }  `
      }
    >
      <Avatar />
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-white text-sm">7 Đĩ</div>
        <div className="text-xs  text-gray-300">
          Cho em xin chữ ký anh Thịnh với ·15m
        </div>
      </div>
    </NavLink>
  );
}
