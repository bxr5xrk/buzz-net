import { Comment, CommentVote, User } from '@prisma/client';

export interface ExtendedComment extends Comment {
  votes: CommentVote[];
  author: User;
  _count: {
    replies: number;
  };
}

export type CommentId = Pick<Comment, 'id'>['id'];
