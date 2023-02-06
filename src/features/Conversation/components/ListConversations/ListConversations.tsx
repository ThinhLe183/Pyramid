import React from "react";
import ConversationCard from "../ConversationCard";
import { useAppSelector } from "../../../../app/hooks";

export default function ListConversations() {
  const conversations = useAppSelector((state) => state.conversation.list);
  return (
    <div className="grow flex flex-col gap-1 overflow-y-scroll px-1 ">
      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
