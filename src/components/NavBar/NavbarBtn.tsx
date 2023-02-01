import React from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  isExtend: boolean;
  name: string;
  icon: any;
  to: string;
}
export default function NavbarBtn({ isExtend, name, icon, to }: NavbarProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `btn capitalize w-full btn-ghost  gap-2 ${
          isExtend ? "justify-start" : "btn-square"
        } ${isActive && "btn-active text-white"}`;
      }}
    >
      <div className="indicator">
        <div className="text-xl">{icon}</div>
        {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
      </div>
      {isExtend ? name : ""}
    </NavLink>
  );
}
