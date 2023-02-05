import React from "react";
import { useParams } from "react-router-dom";

export default function ChatLayout() {
  const { conversationId } = useParams();

  return conversationId ? (
    <div className="flex justify-center">Conversation : {conversationId}</div>
  ) : (
    <div className="flex h-full justify-center items-center text-2xl font-semibold">
      Select a chat or start a new conversation
    </div>
  );
}
