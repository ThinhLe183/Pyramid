import React from "react";
import ConversationCard from "../ConversationCard";

export default function ListConversations() {
  return (
    <div className="grow flex flex-col gap-1 overflow-y-scroll px-1 ">
      <ConversationCard />
    </div>
  );
}
