import { useCommunity } from '@/entities/Community/model/service/dbService';
import { CreatePost } from '@/entities/Post';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { notFound } from 'next/navigation';

interface SubredditPageProps {
  params: {
    slug: string;
  };
}

export default async function SubredditPage({ params }: SubredditPageProps) {
  const { slug } = params;

  const session = await getAuthSession();

  const community = await useCommunity(slug);

  if (!community) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{community.name}
      </h1>
      <CreatePost session={session} />

      {/* <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} /> */}
    </>
  );
}
