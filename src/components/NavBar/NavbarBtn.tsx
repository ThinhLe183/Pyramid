import React from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  isExtend: boolean;
  name: string;
  icon: JSX.Element;
  to: string;
}
export function NavbarBtn({ isExtend, name, icon, to }: NavbarProps) {
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
