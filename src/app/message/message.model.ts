export interface Message {
    creator: Number;
    messageBody: String;
    parentMessage: Number|undefined;
    recipient: Number|undefined;
    recipientGroup: Number|undefined;
  }
  