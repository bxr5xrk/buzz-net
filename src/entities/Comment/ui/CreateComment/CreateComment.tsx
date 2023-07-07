'use client';

import { Button } from '@/shared/ui/Button';
import { Label } from '@/shared/ui/Label';
import { Textarea } from '@/shared/ui/Textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateComment } from '../../model/service/commentService';

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

export function CreateComment({ postId, replyToId }: CreateCommentProps) {
  const [input, setInput] = useState('');
  const router = useRouter();

  const { mutate: onCreate, isLoading } = useCreateComment({
    onSuccessHandler: () => {
      router.refresh();
    }
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => onCreate({ postId, text: input, replyToId })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
