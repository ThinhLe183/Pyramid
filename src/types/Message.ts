import { User } from "./User";

export interface Message {
  id: string;
  type: "TEXT" | "IMAGE" | "Notify";
  author: Pick<User, "id" | "username" | "avatar" | "name">;
  conversation_id: string;
  msg: string;
  mentions: string[];
  attachments: string[];
  ts: Date;
  updated_at: Date;
}
