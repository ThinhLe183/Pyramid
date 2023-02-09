import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
export default function ChatInput() {
  const [input, setInput] = useState("");
  return (
    <form
      className="flex justify-center items-center py-2 shadow gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(input);
        setInput("");
      }}
    >
      <input
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
