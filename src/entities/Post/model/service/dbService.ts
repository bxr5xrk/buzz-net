import { redis } from '@/shared/lib/config';
import { db } from '@/shared/lib/db/db';
import { CachedPost } from '@/types/redis';

export const getCachedPost = async (postId: string) => {
  const cachedPost = (await redis.hgetall(`post:${postId}`)) as CachedPost;

  if (cachedPost) {
    return { post: cachedPost };
  }

  const post = await db.post.findFirst({
    where: {
      id: postId
    },
    include: {
      votes: true,
      author: true
    }
  });

  return { post };
};

export const getPostWithVotes = async (postId: string) => {
  const post = await db.post.findUnique({
    where: {
      id: postId
    },
    include: {
      votes: true
    }
  });

  return post;
};
