import ChatHeader from "../features/Chat/components/ChatHeader";
import ChatArea from "../features/Chat/components/ChatArea";
import ChatInput from "../features/Chat/components/ChatInput";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchMessages,
  setSelectedConversation,
} from "../features/Conversation/slice/conversationSlice";

export default function Chat() {
  const { id } = useParams();
  const { selectedConversation, messages } = useAppSelector(
    (state) => state.conversation
  );

  return selectedConversation ? (
    <div className="grow flex flex-col justify-between h-full">
      <div>Conversation: {selectedConversation.id}</div>
      <ChatHeader conversation={selectedConversation} />
      <ChatArea messages={messages} />
      <ChatInput />
    </div>
  ) : (
    <div className="grow flex h-full justify-center items-center text-2xl font-semibold">
      Select a chat or start a new conversation
    </div>
  );
}
