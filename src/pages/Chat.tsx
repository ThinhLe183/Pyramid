import ChatHeader from "../features/Chat/components/ChatHeader";
import ChatArea from "../features/Chat/components/ChatArea";
import ChatInput from "../features/Chat/components/ChatInput";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { fetchMessages } from "../features/Conversation/slice/conversationSlice";

import { useParams } from "react-router-dom";

export default function Chat() {
  const { id } = useParams();
  const { list: conversations } = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();
  const selectedConversation = conversations.find((cvs) => cvs.id === id);

  useEffect(() => {
    if (selectedConversation && selectedConversation.messages == undefined) {
      const promise = dispatch(fetchMessages(selectedConversation.id));
      return () => promise.abort();
    }
  }, [id, dispatch, conversations]);
  return selectedConversation ? (
    <div className="grow flex flex-col justify-between h-full">
      <ChatHeader conversation={selectedConversation} />
      <ChatArea conversation={selectedConversation} />
      <ChatInput />
    </div>
  ) : (
    <div className="grow flex h-full justify-center items-center text-2xl font-semibold text-error">
      This conversation may not exist
    </div>
  );
}
