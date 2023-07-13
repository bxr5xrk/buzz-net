'use client';

import { UserAvatar } from '@/features/UserAvatar';
import { formatTimeToNow } from '@/shared/lib/formatDate/formatDate';
import { useOnClickOutside } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/Button';
import { CommentVote } from '@prisma/client';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ExtendedComment } from '../../model/types/comment';
import { CommentsList } from '../CommentsList/CommentsList';
import { CommentVotes } from '../CommentVotes/CommentVotes';
import { ReplyArea } from '../ReplyArea/ReplyArea';

const singularOrPluralMessage = (
  count: number,
  singular: string,
  plural: string
) => (count === 1 ? count + ' ' + singular : count + ' ' + plural);

interface CommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
  repliesCount: number;
}

export function Comment({
  comment,
  votesAmt,
  currentVote,
  postId,
  repliesCount
}: CommentProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const commentRef = useRef<HTMLDivElement>(null);

  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  useOnClickOutside(commentRef, () => {
    setIsReplying(false);
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          name={comment.author.name || null}
          image={comment.author.image || null}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.username}
          </p>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="mt-2 text-sm text-zinc-900">{comment.text}</p>

      <div className="flex items-center gap-2">
        <CommentVotes
          commentId={comment.id}
          votesAmount={votesAmt}
          currentVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) return router.push('/sign-in');
            setIsReplying(true);
          }}
          theme="ghost"
          size="xs"
        >
          <MessageSquare className="mr-1.5 h-4 w-4" />
          Reply
        </Button>

        {repliesCount ? (
          <Button
            onClick={() => setShowReplies((prev) => !prev)}
            theme="subtle"
            size="xs"
            className="flex gap-2 rounded-3xl border px-2"
          >
            {showReplies ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {singularOrPluralMessage(repliesCount, 'reply', 'replies')}
          </Button>
        ) : null}
      </div>

      <ReplyArea
        commentId={comment.id}
        postId={postId}
        username={comment.author.username ?? ''}
        isReplying={isReplying}
        setIsReplying={setIsReplying}
      />

      {showReplies ? (
        <div className="ml-3 border-l-2 border-zinc-200 py-2 pl-4">
          <CommentsList replyToId={comment.id} postId={postId} />
        </div>
      ) : null}
    </div>
  );
}
