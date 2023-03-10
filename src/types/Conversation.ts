import { LastMessage } from "./LastMessage";
import { Message } from "./Message";
import { Participant } from "./Participant";

export interface Conversation {
  id: string;
  type: "DM" | "GROUP_DM";
  name?: string | undefined;
  icon?: string | undefined;
  owner_id?: string | undefined;
  participants: Participant[];
  last_message?: LastMessage;
  messages: Message[] | undefined;
  total_messages_sent: number;
  created_at: Date;
  updated_at: Date;
}
