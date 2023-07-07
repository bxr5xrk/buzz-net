import { PostId } from '@/entities/Post/model/types/post';

import { commentsTree } from '../../model/lib/commentsTree';
import { useComments } from '../../model/service/dbService';
import { CommentsList } from '../CommentsList/CommentsList';
import { CreateComment } from '../CreateComment/CreateComment';

interface CommentsSectionProps {
  postId: PostId;
}

export async function CommentsSection({ postId }: CommentsSectionProps) {
  const { comments } = await useComments(postId);

  const { tree } = commentsTree(comments);

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <hr className="my-6 h-px w-full" />

      <CreateComment postId={postId} />

      <div className="mt-4 flex flex-col gap-y-6">
        {/* @ts-expect-error Server Component */}
        <CommentsList comments={tree} />
      </div>
    </div>
  );
}
