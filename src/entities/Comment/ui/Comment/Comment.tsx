'use client';

import { UserAvatar } from '@/features/UserAvatar';
import { formatTimeToNow } from '@/shared/lib/formatDate/formatDate';
import { useOnClickOutside } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/Button';
import { Label } from '@/shared/ui/Label';
import { Textarea } from '@/shared/ui/Textarea';
import { CommentVote } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useCreateComment } from '../../model/service/commentService';
import { ExtendedComment } from '../../model/types/comment';

interface CommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
}

export function Comment({
  comment,
  votesAmt,
  currentVote,
  postId
}: CommentProps) {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState(`@${comment.author.username} `);
  const router = useRouter();
  useOnClickOutside(commentRef, () => {
    setIsReplying(false);
  });

  const { mutate: onCrete, isLoading } = useCreateComment({
    onSuccessHandler: () => {
      router.refresh();
      setIsReplying(false);
    }
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
        {/* <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        /> */}

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
      </div>

      {isReplying ? (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="comment">Your comment</Label>
          <div className="mt-2">
            <Textarea
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              autoFocus
              id="comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="What are your thoughts?"
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button
                tabIndex={-1}
                theme="subtle"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() => {
                  if (!input) return;
                  onCrete({
                    postId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id // default to top-level comment
                  });
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
