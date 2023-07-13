// import { db } from '@/shared/lib/db/db';

import { db } from '@/shared/lib/db/db';

// import { Comment } from '@prisma/client';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

export const useCommentsServer = async (
  postId: string,
  replyToId?: string | null
) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
      replyToId
    },
    include: {
      author: true,
      votes: true,
      _count: {
        select: {
          replies: true
        }
      }
    }
  });

  return { comments };
};
