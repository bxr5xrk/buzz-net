import { PostFeed } from '@/entities/Post';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { notFound } from 'next/navigation';
import {
  getFollowedCommunities,
  getPostsFromFollowedCommunities
} from '../../model/service/dbService';

export const PersonalizedFeed = async () => {
  const session = await getAuthSession();

  // only rendered if session exists, so this will not happen
  if (!session) return notFound();

  const communities = await getFollowedCommunities(session?.user.id ?? '');
  const posts = await getPostsFromFollowedCommunities(communities);

  return <PostFeed initialPosts={posts} />;
};
