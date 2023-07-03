import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/shared/const';
// import { getAuthSession } from '@/shared/lib/auth/auth';
import { db } from '@/shared/lib/db/db';
import { notFound } from 'next/navigation';

interface SubredditPageProps {
  params: {
    slug: string;
  };
}

export default async function SubredditPage({ params }: SubredditPageProps) {
  const { slug } = params;

  // const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      {/* <MiniCreatePost session={session} />
      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} /> */}
    </>
  );
}
