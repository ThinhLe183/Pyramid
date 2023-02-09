import { Outlet, useParams } from "react-router-dom";
import BottomCopyright from "../features/Conversation/components/BottomCopyright";
import ListConversations from "../features/Conversation/components/ListConversations";
import TopSearchConversation from "../features/Conversation/components/TopSearchChat";
import { useAppSelector } from "../app/hooks";
import ListSkeletonConversation from "../features/Conversation/components/ListSkeletonConversation/SkeletonConversation";

export default function Conversation() {
  const { list: conversations, isConversationLoading } = useAppSelector(
    (state) => state.conversation
  );

  return (
    <>
      <div className="flex flex-col divide-y-2 divide-gray-600 divide-opacity-20 w-1/4 ">
        <TopSearchConversation />
        {isConversationLoading ? (
          <ListSkeletonConversation />
        ) : (
          <ListConversations conversations={conversations} />
        )}
        <BottomCopyright />
      </div>
      <Outlet />
    </>
  );
}
