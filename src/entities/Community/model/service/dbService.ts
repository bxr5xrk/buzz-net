import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/shared/const';
import { db } from '@/shared/lib/db/db';

export const useCommunity = (slug: string) =>
  db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS
      }
    }
  });

export const useCommunityMemberCount = (slug: string) =>
  db.subscription.count({
    where: {
      subreddit: {
        name: slug
      }
    }
  });

export const useIsUserSubscribed = ({
  slug,
  id
}: {
  slug: string;
  id?: string;
}) =>
  db.subscription.findFirst({
    where: {
      subreddit: {
        name: slug
      },
      user: {
        id
      }
    }
  });
