import {Message} from "./message.model";
import {MessageGroup} from "./message-groups.model";

export interface WebSocketMessage {
  type: string,
  payload: Message | number | MessageGroup
}
