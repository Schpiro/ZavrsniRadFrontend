export interface Comment{
  creator: number,
  commentBody: string,
  creationDate: string,
  parentCommentId: number|undefined
}
