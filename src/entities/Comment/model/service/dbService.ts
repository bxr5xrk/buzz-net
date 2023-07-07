import { db } from '@/shared/lib/db/db';

export const useComments = async (
  postId: string,
  replyToId?: string | null
) => {
  const comments = await db.comment.findMany({
    where: {
      postId: postId
      // replyToId
    },
    include: {
      author: true,
      votes: true
    }
  });

  return { comments };
};
