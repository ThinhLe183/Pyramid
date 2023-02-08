import { Outlet, useParams } from "react-router-dom";
import BottomCopyright from "../features/Conversation/components/BottomCopyright";
import ListConversations from "../features/Conversation/components/ListConversations";
import TopSearchConversation from "../features/Conversation/components/TopSearchChat";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchConversations,
  setSelectedConversation,
} from "../features/Conversation/slice/conversationSlice";
import ListSkeletonConversation from "../features/Conversation/components/ListSkeletonConversation/SkeletonConversation";

export default function Conversation() {
  const { id } = useParams();

  const { list: conversations, isConversationLoading } = useAppSelector(
    (state) => state.conversation
  );

  return (
    <div className="flex divide-x-2 divide-gray-600 divide-opacity-20 grow">
      <div className="flex flex-col  divide-y-2  divide-gray-600 divide-opacity-20">
        <TopSearchConversation />
        {isConversationLoading ? (
          <ListSkeletonConversation />
        ) : (
          <ListConversations conversations={conversations} />
        )}
        <BottomCopyright />
      </div>
      <Outlet />
    </div>
  );
}
