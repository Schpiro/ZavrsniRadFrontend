export interface Comment {
  id: number,
  creator: number,
  commentBody: string,
  creationDate: string,
  parentCommentId: number | undefined
}
