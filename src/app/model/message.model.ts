export interface Message {
    creator: number|undefined;
    messageBody: string;
    parentMessage: number|undefined;
    recipientId: number|undefined;
    recipientGroupId: number|undefined;
    groupParticipantsIds: number[]|undefined;
    creationDate: string|undefined;
  }
