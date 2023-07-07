import { db } from '@/shared/lib/db/db';

export const useComments = async (postId: string) => {
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyToId: null // only fetch top-level comments
    },
    include: {
      author: true,
      votes: true,
      replies: {
        // first level replies
        include: {
          author: true,
          votes: true
        }
      }
    }
  });

  return { comments };
};
