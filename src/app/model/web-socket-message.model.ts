import {Message} from "./message.model";
import {MessageGroup} from "./message-groups.model";
import {Event} from "./event.model";

export interface WebSocketMessage {
  type: string,
  payload: Message | number | MessageGroup | RTCSessionDescriptionInit | RTCIceCandidate | Event
  recipientIds: number[]|undefined;
  senderId: number|undefined;
}
