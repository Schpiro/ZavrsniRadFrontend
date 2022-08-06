export interface Comment{
  creatorId: number,
  commentBody: string,
  creationDate: number,
  parentCommentId: number|undefined
}
