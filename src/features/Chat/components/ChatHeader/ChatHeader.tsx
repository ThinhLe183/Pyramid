import React from "react";
import { Conversation } from "../../../../types/Conversation";
import Avatar from "../../../../components/Avatar";
import { useAppSelector } from "../../../../app/hooks";
import excludeMe from "../../../../utils/excludeMe";
interface ChatHeaderProps {
  conversation: Conversation;
}
export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const me = useAppSelector((state) => state.user.data);
  const participants = excludeMe(conversation.participants, me?.id);
  return (
    <div className=" flex justify-between items-center h-12 shadow-md px-4 ">
      <button className="btn btn-ghost gap-2">
        <Avatar
          extraClass="w-8"
          src={conversation.icon || participants[0].avatar}
        />
        <p>
          {conversation.name ||
            participants
              .map((participant) => participant.nickname || participant.name)
              .join(", ")}
        </p>
      </button>
    </div>
  );
}
