import React from "react";

export default function ChatInput() {
  return (
    <div className="flex justify-center items-center py-2 shadow">
      <input
        type="text"
        placeholder="Aa"
        className="input input-sm w-full max-w-3xl rounded-3xl input-bordered focus:outline-none h-10 text-white"
      />
    </div>
  );
}
