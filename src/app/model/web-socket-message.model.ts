import {Message} from "./message.model";

export interface WebSocketMessage {
  type: string,
  payload: Message | number
}
