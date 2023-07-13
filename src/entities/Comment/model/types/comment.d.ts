import { Comment, CommentVote, User } from '@prisma/client';

export interface ExtendedComment extends Comment {
  votes: CommentVote[];
  author: User;
}

export type CommentId = Pick<Comment, 'id'>['id'];
