import React from "react";

export default function ListSkeletonConversation() {
  return (
    <div className="grow flex flex-col gap-1 overflow-y-scroll px-1 ">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
function Skeleton() {
  return (
    <div className="`h-18 p-3 rounded-lg flex gap-4 items-center animate-pulse w-full">
      <div className="w-12 h-12 rounded-full bg-slate-600 "></div>
      <div className="space-y-2 w-4/5">
        <div className="h-4 w-3/5 bg-slate-600 rounded"></div>
        <div className="h-4 bg-slate-600 rounded"></div>
      </div>
    </div>
  );
}
