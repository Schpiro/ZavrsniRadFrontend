import {Message} from "./message.model";
import {MessageGroup} from "./message-groups.model";

export interface WebSocketMessage {
  type: string,
  payload: Message | number | MessageGroup | RTCSessionDescriptionInit | RTCIceCandidate
  recipientIds: number[]|undefined;
  senderId: number|undefined;
}
