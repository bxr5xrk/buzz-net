'use client';

import { PostId } from '@/entities/Post/model/types/post';
import { Fragment } from 'react';
import { commentsTree } from '../../model/lib/commentsTree';
// import { useComments } from '../../model/service/dbService';
import { CommentsList } from '../CommentsList/CommentsList';
import { CreateComment } from '../CreateComment/CreateComment';

interface CommentsSectionProps {
  postId: PostId;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  // const { data: comments } = useComments(postId, null);

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <hr className="my-6 h-px w-full" />

      <CreateComment postId={postId} />

      <div className="mt-4 flex flex-col gap-y-3">
        <CommentsList postId={postId} replyToId={null} />
        {/* @1ts-expect-error Server Component */}
        {/* {comments?.map((i) => (
          <Fragment key={i.id}>
            <Item
              id={i.id}
              key={i.id}
              postId={i.postId}
              text={i.text}
              count={i._count.replies}
            />
          </Fragment>
        ))} */}
        {/* <RecursiveComment postId={postId} replyToId={null} comment /> */}

        {/* <CommentsList comments={tree} /> */}
      </div>
    </div>
  );
}
