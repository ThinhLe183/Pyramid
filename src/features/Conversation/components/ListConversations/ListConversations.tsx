import ConversationCard from "../ConversationCard";
import { Conversation } from "../../../../types/Conversation";
interface ListConversationProps {
  conversations: Conversation[];
}
export default function ListConversations({
  conversations,
}: ListConversationProps) {
  return (
    <div className="grow flex flex-col gap-1 overflow-y-scroll px-1 ">
      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
