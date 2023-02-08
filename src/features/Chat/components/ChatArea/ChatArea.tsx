import React from "react";
import { Message } from "../../../../types/Message";
import { useAppSelector } from "../../../../app/hooks";
import { Conversation } from "../../../../types/Conversation";
import defaultAvatar from "../../../../assets/avatar/default-avatar.png";
interface ChatAreaProps {
  messages: Message[];
  conversation: Conversation;
}
export default function ChatArea({ messages, conversation }: ChatAreaProps) {
  const me = useAppSelector((state) => state.user.data);
  const isMine = (id: string) => {
    return id == me?.id;
  };
  return (
    <div className="grow overflow-y-scroll px-4">
      {messages.map(({ id, author, attachments, mentions, msg, ts, type }) => {
        return (
          <div
            key={id}
            className={`chat ${isMine(author.id) ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={author.avatar || defaultAvatar} />
              </div>
            </div>
            <div className="chat-header flex items-center gap-2">
              <div>
                {isMine(author.id)
                  ? "you"
                  : conversation.participants.find(
                      (participant) => participant.id === author.id
                    )?.nickname || author.name}
              </div>
              <time className="text-xs opacity-50">{ts.toString()}</time>
            </div>
            <div className="chat-bubble">{msg}</div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        );
      })}
    </div>
  );
}
