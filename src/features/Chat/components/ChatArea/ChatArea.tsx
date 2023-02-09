import { Message } from "../../../../types/Message";
import { useAppSelector } from "../../../../app/hooks";
import { Conversation } from "../../../../types/Conversation";
import defaultAvatar from "../../../../assets/avatar/default-avatar.png";
import timeSeparator from "../../../../utils/timeSeparator";
interface ChatAreaProps {
  conversation: Conversation;
}
export default function ChatArea({ conversation }: ChatAreaProps) {
  const me = useAppSelector((state) => state.user.data);

  return (
    <div className="grow overflow-y-scroll px-4">
      {conversation.messages &&
        conversation.messages.map(
          (
            { id, author, attachments, mentions, msg, ts, type },
            index,
            messages
          ) => {
            const isMine = author.id == me?.id;
            const isShowTimeSeparator =
              index > 0 &&
              new Date(ts).getTime() -
                new Date(messages[index - 1].ts).getTime() >
                15 * 60 * 1000;

            return (
              <>
                {isShowTimeSeparator && (
                  <div className="divider">
                    {timeSeparator(ts)}
                  </div>
                )}
                <div
                  key={id}
                  className={`chat ${isMine ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {!isMine && <img src={author.avatar || defaultAvatar} />}
                    </div>
                  </div>
                  <div className="chat-header pl-4">
                    {conversation.type === "GROUP_DM" && (
                      <div>
                        {isMine
                          ? ""
                          : conversation.participants.find(
                              (participant) => participant.id === author.id
                            )?.nickname || author.name}
                      </div>
                    )}
                  </div>
                  <div
                    className={`py-2 px-4 rounded-2xl text-white ${
                      isMine ? "chat-end bg-primary" : "chat-start bg-neutral"
                    }`}
                  >
                    {msg}
                  </div>
                  {/* <div className="chat-footer opacity-50">Delivered</div> */}
                </div>
              </>
            );
          }
        )}
    </div>
  );
}
