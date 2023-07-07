import { Comment, CommentVote, User } from '@prisma/client';

export interface ExtendedComment extends Comment {
  votes: CommentVote[];
  author: User;
}
