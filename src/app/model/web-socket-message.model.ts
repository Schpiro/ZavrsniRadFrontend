import {Message} from "./message.model";
import {MessageGroup} from "./message-groups.model";
import {Event} from "./event.model";
import {Comment} from "./comment.model";

export interface WebSocketMessage {
  type: string,
  payload: Message | number | MessageGroup | RTCSessionDescriptionInit | RTCIceCandidate | Event | Comment | string
  recipientIds: number[]|undefined;
  senderId: number|undefined;
  senderName: string|undefined;
}
