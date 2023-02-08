import React from "react";
import { Message } from "../../../../types/Message";
interface ChatAreaProps {
  messages: Message[];
}
export default function ChatArea({ messages }: ChatAreaProps) {
  return (
    <div className="grow overflow-y-scroll px-4">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg" />
          </div>
        </div>
        <div className="chat-header">
          Lionel Messi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
}
