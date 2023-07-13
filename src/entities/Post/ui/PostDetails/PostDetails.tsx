import { CommentsSection } from '@/entities/Comment';
import { VoteSkeleton } from '@/entities/Vote';
import { PostVoteServer } from '@/entities/Vote/ui/PostVote/PostVoteServer/PostVoteServer';
import { formatTimeToNow } from '@/shared/lib/formatDate/formatDate';
import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getCachedPost, getPostWithVotes } from '../../model/service/dbService';
import EditorOutput from '../EditorOutput/Editoroutput';

export async function PostDetails({ postId }: { postId: string }) {
  const { post } = await getCachedPost(postId);

  if (!post) return notFound();

  return (
    <div className="flex h-full flex-col items-center justify-between sm:flex-row sm:items-start">
      <Suspense fallback={<VoteSkeleton />}>
        {/* @ts-expect-error server component */}
        <PostVoteServer
          postId={post.id}
          getData={async () => await getPostWithVotes(postId)}
        />
      </Suspense>

      <div className="w-full flex-1 rounded-sm bg-white p-4 sm:w-0">
        <p className="mt-1 max-h-40 truncate text-xs text-gray-500">
          Posted by u/
          {'author' in post ? post.author.username : post.authorUsername}{' '}
          {formatTimeToNow(new Date(post.createdAt))}
        </p>
        <h1 className="py-2 text-xl font-semibold leading-6 text-gray-900">
          {post.title}
        </h1>

        <EditorOutput content={post.content} />
        <Suspense
          fallback={<Loader2 className="h-5 w-5 animate-spin text-zinc-500" />}
        >
          <CommentsSection postId={post.id} />
        </Suspense>
      </div>
    </div>
  );
}
