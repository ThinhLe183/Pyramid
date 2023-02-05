import React from "react";
import { SlNote } from "react-icons/sl";

export default function TopSearchConversation() {
  return (
    <div className="px-4 pb-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-white">Chats</p>
        <button className="btn btn-sm btn-ghost btn-circle">
          <SlNote className="text-lg" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search…"
        className="input input-sm w-full rounded-3xl input-bordered"
      />
    </div>
  );
}
