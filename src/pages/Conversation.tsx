import BottomCopyright from "../features/Conversation/components/BottomCopyright";
import ListConversations from "../features/Conversation/components/ListConversations";
import TopSearchConversation from "../features/Conversation/components/TopSearchChat";

export default function Conversation() {
  return (
    <div className="flex flex-col h-full divide-y-2  divide-gray-600 divide-opacity-20">
      <TopSearchConversation />
      <ListConversations />
      <BottomCopyright />
    </div>
  );
}
