'use client';

import { PostId } from '@/entities/Post/model/types/post';
import { Button } from '@/shared/ui/Button';
import { Textarea } from '@/shared/ui/Textarea';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateComment } from '../../model/service/commentService';
import { CommentId } from '../../model/types/comment';

interface ReplyAreaProps {
  postId: PostId;
  commentId: CommentId;
  username: string;
  isReplying: boolean;
  setIsReplying: (i: boolean) => void;
}

export function ReplyArea({
  isReplying,
  setIsReplying,
  username,
  postId,
  commentId
}: ReplyAreaProps) {
  const [input, setInput] = useState(`@${username} `);
  const router = useRouter();

  const { mutate: onCrete, isLoading } = useCreateComment({
    onSuccessHandler: () => {
      router.refresh();
      setIsReplying(false);
    }
  });

  return (
    <>
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
                  if (!input.trim()) return;
                  onCrete({
                    postId,
                    text: input,
                    replyToId: commentId
                  });
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
