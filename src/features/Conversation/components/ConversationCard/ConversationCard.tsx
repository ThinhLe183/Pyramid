import Avatar from "../../../../components/Avatar";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Conversation } from "../../../../types/Conversation";
import { formatTime } from "../../../../utils/formatDate";
import excludeMe from "../../../../utils/excludeMe";

interface ConversationCardProps {
  conversation: Conversation;
}
export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  const me = useAppSelector((state) => state.user.data);
  const conversationName =
    conversation.name ||
    excludeMe(conversation.participants, me?.id)
      .map((participant) => participant.nickname || participant.name)
      .join(", ");
  const sender =
    conversation.participants.find(
      (participant) => participant.id === conversation.last_message?.author_id
    )?.nickname || conversation.last_message?.author_name;

  return (
    <NavLink
      to={`d/${conversation.id}`}
      end
      className={({ isActive }) =>
        `h-18 p-3 rounded-lg flex gap-4 items-center relative ${
          isActive
            ? "bg-[#2c3d53] hover:bg-none"
            : "hover:bg-gray-400 hover:bg-opacity-20 hover:cursor-pointer"
        }  `
      }
    >
      <Avatar />
      <div className="flex flex-col justify-between gap-1 w-8/12 relative ">
        <div className="font-semibold text-white text-sm truncate">
          {conversationName}
        </div>
        <div className="text-xs h-5 text-gray-300 truncate ">
          {conversation.last_message?.author_id === me?.id && "you: "}
          {conversation.type === "GROUP_DM" &&
            conversation.last_message?.author_id !== me?.id &&
            sender &&
            sender + ": "}
          {conversation.last_message?.msg}
        </div>
        <span className="text-xs absolute -right-8 bottom-1">
          {conversation.last_message?.ts
            ? formatTime(conversation.last_message?.ts)
            : ""}
        </span>
      </div>
    </NavLink>
  );
}
