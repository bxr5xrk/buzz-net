import { PostId } from '@/entities/Post/model/types/post';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { useComments } from '../../model/service/commentService';
import { Comment } from '../Comment/Comment';

interface CommentsListProps {
  replyToId: string | null;
  postId: PostId;
}

export function CommentsList({ replyToId, postId }: CommentsListProps) {
  const { data } = useSession();
  const { data: comments } = useComments(postId, replyToId);

  return (
    <>
      {comments?.map((comment) => {
        const votesAmount = comment.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1;
          if (vote.type === 'DOWN') return acc - 1;
          return acc;
        }, 0);

        const currentVote = comment.votes.find(
          (vote) => vote.userId === data?.user.id
        );

        return (
          <Comment
            key={comment.id}
            comment={comment}
            currentVote={currentVote}
            votesAmt={votesAmount}
            postId={comment.postId}
            repliesCount={comment._count.replies}
          />
        );
      })}
    </>
  );
}
