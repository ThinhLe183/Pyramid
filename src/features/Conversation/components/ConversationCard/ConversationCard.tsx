import React from "react";
import Avatar from "../../../../components/Avatar";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Conversation } from "../../../../types/Conversation";
import { formatTime } from "../../../../utils/formatDate";

interface ConversationCardProps {
  conversation: Conversation;
}
export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  const me = useAppSelector((state) => state.user.data);
  const otherName = conversation.participants
    .filter((participant) => participant.id !== me?.id)
    .map((participant) => participant.nickname || participant.name)
    .join(", ");
  return (
    <NavLink
      to={`d/${conversation.id}`}
      className={({ isActive }) =>
        `h-18 p-3 rounded-lg flex gap-4 items-center relative ${
          isActive
            ? "bg-[#2c3d53] hover:bg-none"
            : "hover:bg-gray-400 hover:bg-opacity-20 hover:cursor-pointer"
        }  `
      }
    >
      <Avatar />
      <div className="flex flex-col justify-between gap-1 w-9/12 ">
        <div className="font-semibold text-white text-sm truncate">
          {conversation.name || otherName}
        </div>
        <div className="text-xs h-5 text-gray-300 truncate">
          {conversation.last_message?.msg}
        </div>
      </div>
      <span className="text-xs absolute right-2 bottom-5">
        {conversation.last_message?.ts
          ? formatTime(conversation.last_message?.ts)
          : ""}
      </span>
    </NavLink>
  );
}
