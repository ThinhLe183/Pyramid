import { MessageType } from "./enum/MessageType";

export interface LastMessage {
  type: MessageType;
  author_id: String;
  author_name: String;
  msg: String;
  mentions: String[];
  attachments: String[];
  ts: Date;
}
