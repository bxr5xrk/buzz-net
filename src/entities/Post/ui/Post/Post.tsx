import { AuthorUsername } from '@/entities/Author/model/types/author';
import { CommunityName } from '@/entities/Community/model/types/community';
import { PostVoteClient } from '@/entities/Vote';
import { VoteType } from '@/entities/Vote/model/types/vote';
import { formatTimeToNow } from '@/shared/lib/formatDate/formatDate';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import {
  PostContent,
  PostCreatedAt,
  PostId,
  PostTitle
} from '../../model/types/post';
import EditorOutput from '../EditorOutput/Editoroutput';

interface PostProps {
  communityName: CommunityName;
  authorUsername: AuthorUsername;
  title: PostTitle;
  createdAt: PostCreatedAt;
  id: PostId;
  content: PostContent;
  commentsAmount: number;
  votesAmount: number;
  currentVoteType?: VoteType;
}

export function Post({
  communityName,
  authorUsername,
  title,
  createdAt,
  id,
  content,
  commentsAmount,
  votesAmount,
  currentVoteType
}: PostProps) {
  const postRef = useRef<HTMLParagraphElement>(null);

  return (
    <>
      <div className="flex justify-between px-6 py-4">
        <PostVoteClient
          postId={id}
          initialVotesAmount={votesAmount}
          initialVote={currentVoteType}
        />

        <div className="w-0 flex-1">
          <div className="mt-1 max-h-40 text-xs text-gray-500">
            {communityName ? (
              <>
                <a
                  className="text-sm text-zinc-900 underline underline-offset-2"
                  href={`/r/${communityName}`}
                >
                  r/{communityName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by u/{authorUsername}</span>{' '}
            {formatTimeToNow(new Date(createdAt))}
          </div>
          <a href={`/r/${communityName}/post/${id}`}>
            <h1 className="py-2 text-lg font-semibold leading-6 text-gray-900">
              {title}
            </h1>
          </a>

          <div
            className="relative max-h-40 w-full overflow-clip text-sm"
            ref={postRef}
          >
            <EditorOutput content={content} />
            {postRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="z-20 bg-gray-50 px-4 py-4 text-sm sm:px-6">
        <Link
          href={`/r/${communityName}/post/${id}`}
          className="flex w-fit items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentsAmount} comments
        </Link>
      </div>
    </>
  );
}
