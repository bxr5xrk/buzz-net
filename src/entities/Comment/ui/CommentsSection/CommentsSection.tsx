import { PostId } from '@/entities/Post/model/types/post';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { useComments } from '../../model/service/dbService';
import Comment from '../Comment/Comment';
import { CreateComment } from '../CreateComment/CreateComment';

interface CommentsSectionProps {
  postId: PostId;
}

export async function CommentsSection({ postId }: CommentsSectionProps) {
  const session = await getAuthSession();

  const { comments } = await useComments(postId);

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <hr className="my-6 h-px w-full" />

      <CreateComment postId={postId} />

      <div className="mt-4 flex flex-col gap-y-6">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((comment) => {
            const votesAmount = comment.votes.reduce((acc, vote) => {
              if (vote.type === 'UP') return acc + 1;
              if (vote.type === 'DOWN') return acc - 1;
              return acc;
            }, 0);

            const topLevelCommentVote = comment.votes.find(
              (vote) => vote.userId === session?.user.id
            );

            return (
              <div key={comment.id} className="flex flex-col">
                <div className="mb-2">
                  <Comment
                    comment={comment}
                    currentVote={topLevelCommentVote}
                    votesAmt={votesAmount}
                    postId={postId}
                  />
                </div>

                {/* Render replies */}
                {comment.replies
                  .sort((a, b) => b.votes.length - a.votes.length) // Sort replies by most liked
                  .map((reply) => {
                    const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                      if (vote.type === 'UP') return acc + 1;
                      if (vote.type === 'DOWN') return acc - 1;
                      return acc;
                    }, 0);

                    const replyVote = reply.votes.find(
                      (vote) => vote.userId === session?.user.id
                    );

                    return (
                      <div
                        key={reply.id}
                        className="ml-2 border-l-2 border-zinc-200 py-2 pl-4"
                      >
                        <Comment
                          comment={reply}
                          currentVote={replyVote}
                          votesAmt={replyVotesAmt}
                          postId={postId}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
