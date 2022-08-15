export interface Comment {
  id: number,
  eventId: number,
  creator: string,
  creatorId: number,
  commentBody: string,
  creationDate: string,
  parentCommentId: number | undefined
}
