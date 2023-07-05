import { useCommunity } from '@/entities/Community/model/service/dbService';
import { CreatePost } from '@/entities/Post';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { notFound } from 'next/navigation';

interface CommunityPageProps {
  params: {
    slug: string;
  };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = params;

  const session = await getAuthSession();

  const community = await useCommunity(slug);

  if (!community) return notFound();

  return (
    <>
      <h1 className="h-14 text-3xl font-bold md:text-4xl">
        r/{community.name}
      </h1>
      <CreatePost session={session} />

      {/* <PostFeed initialPosts={community.posts} communityName={community.name} /> */}
    </>
  );
}
