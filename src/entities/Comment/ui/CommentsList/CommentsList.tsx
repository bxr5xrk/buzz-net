import { getAuthSession } from '@/shared/lib/auth/auth';
import { Fragment } from 'react';
import { CommentWithChildren } from '../../model/lib/commentsTree';
import Comment from '../Comment/Comment';

interface CommentsListProps {
  comments: CommentWithChildren[];
}

export async function CommentsList({ comments }: CommentsListProps) {
  const session = await getAuthSession();

  return (
    <>
      {comments.map((comment) => {
        const votesAmount = comment.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1;
          if (vote.type === 'DOWN') return acc - 1;
          return acc;
        }, 0);

        const currentVote = comment.votes.find(
          (vote) => vote.userId === session?.user.id
        );

        return (
          <Fragment key={comment.id}>
            <div className="mb-2">
              <Comment
                comment={comment}
                currentVote={currentVote}
                votesAmt={votesAmount}
                postId={comment.postId}
              />
            </div>

            {comment.children.length ? (
              <div className="ml-3 border-l-2 border-zinc-200 py-2 pl-4">
                {/* @ts-expect-error Server Component */}
                <CommentsList comments={comment.children} />
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </>
  );
}
