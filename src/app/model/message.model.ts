export interface Message {
  creatorId: number | undefined;
  creator: string | undefined;
  messageBody: string;
  parentMessage: number | undefined;
  recipientId: number | undefined;
  recipientGroupId: number | undefined;
  groupParticipantsIds: number[] | undefined;
  creationDate: string;
}
