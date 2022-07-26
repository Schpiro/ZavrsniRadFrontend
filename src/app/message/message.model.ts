export interface Message {
    creator: Number|undefined;
    messageBody: String;
    parentMessage: Number|undefined;
    recipient: Number|undefined;
    recipientGroup: Number|undefined;
    creationDate: Date|undefined;
  }
