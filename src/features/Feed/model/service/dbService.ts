import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/shared/const';
import { db } from '@/shared/lib/db/db';
import { Subscription, Community } from '@prisma/client';

export const usePosts = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      community: true
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS
  });

  return posts;
};

export const getFollowedCommunities = async (userId: string) => {
  const communities = await db.subscription.findMany({
    where: {
      userId
    },
    include: {
      community: true
    }
  });

  return communities;
};

type SubscriptionWithCommunity = { community: Community } & Pick<
  Subscription,
  'communityId' | 'userId'
>;

export const getPostsFromFollowedCommunities = async (
  followedCommunities: SubscriptionWithCommunity[]
) => {
  const posts = await db.post.findMany({
    where: {
      community: {
        name: {
          in: followedCommunities.map((sub) => sub.community.name)
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      community: true
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS
  });

  return posts;
};
