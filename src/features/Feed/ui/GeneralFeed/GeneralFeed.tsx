import { PostFeed } from '@/entities/Post';
import { usePosts } from '../../model/service/dbService';

export const GeneralFeed = async () => {
  const posts = await usePosts();

  return <PostFeed initialPosts={posts} />;
};
