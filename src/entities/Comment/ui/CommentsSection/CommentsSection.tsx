'use client';

import { PostId } from '@/entities/Post/model/types/post';
import { CommentsList } from '../CommentsList/CommentsList';
import { CreateComment } from '../CreateComment/CreateComment';

interface CommentsSectionProps {
  postId: PostId;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <hr className="my-6 h-px w-full" />

      <CreateComment postId={postId} />

      <div className="mt-4 flex flex-col gap-y-3">
        <CommentsList postId={postId} replyToId={null} />
      </div>
    </div>
  );
}
