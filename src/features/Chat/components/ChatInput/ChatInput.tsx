import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useAppDispatch } from "../../../../app/hooks";
import { sendMessage } from "../../../Conversation/slice/conversationSlice";
import { useParams } from "react-router-dom";
export default function ChatInput() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const { id } = useParams();
  const onSendMessage = (e: any) => {
    e.preventDefault();
    if (id) {
      dispatch(sendMessage({ conversationId: id, msg: input }));
    }
    setInput("");
  };
  return (
    <form
      className="flex justify-center items-center py-2 shadow gap-3"
      onSubmit={onSendMessage}
    >
      <input
        maxLength={500}
        type="text"
        placeholder="Aa"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="input input-sm w-full max-w-3xl rounded-3xl input-bordered focus:outline-none h-10 text-white"
      />
      <button className="btn btn-ghost btn-circle">
        <IoSend className="text-2xl text-primary" />
      </button>
    </form>
  );
}
