import ChatHeader from "../features/Chat/components/ChatHeader";
import ChatArea from "../features/Chat/components/ChatArea";
import ChatInput from "../features/Chat/components/ChatInput";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useCallback, useEffect, useMemo } from "react";
import { fetchMessages } from "../features/Conversation/slice/conversationSlice";

export default function Chat() {
  const { selectedConversation: conversation, messages } = useAppSelector(
    (state) => state.conversation
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (conversation && conversation.id) {
      const promise = dispatch(fetchMessages(conversation.id));
      return () => promise.abort();
    }
  }, [conversation]);
  return (
    conversation && (
      <div className="grow flex flex-col justify-between h-full">
        <div>Conversation: {conversation.id}</div>
        <ChatHeader conversation={conversation} />
        <ChatArea messages={messages} conversation={conversation}/>
        <ChatInput />
      </div>
    )
  );
}
