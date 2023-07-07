import type { Post, Community, User, Vote, Comment } from '@prisma/client';

export interface CommunityPost extends Post {
  community: Community;
  votes: Vote[];
  author: User;
  comments: Comment[];
}

export interface PostWithVotes extends Post {
  votes: Vote[];
}

export type PostTitle = Pick<Post, 'title'>['title'];
export type PostId = Pick<Post, 'id'>['id'];
export type PostCreatedAt = Pick<Post, 'createdAt'>['createdAt'];
export type PostContent = Pick<Post, 'content'>['content'];
