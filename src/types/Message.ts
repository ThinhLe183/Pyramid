import { LastMessage } from "./LastMessage";
import { User } from "./User";
import { MessageType } from "./enum/MessageType";

export interface Message {
  id: string;
  type: MessageType;
  author: Pick<User, "id" | "username" | "avatar" | "name">;
  conversation_id: string;
  msg: string;
  mentions: string[];
  attachments: string[];
  ts: Date;
  last_message: LastMessage | null | undefined;
  updated_at: Date;
}
