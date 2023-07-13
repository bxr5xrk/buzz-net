import { PostId } from '@/entities/Post/model/types/post';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { CommentWithChildren } from '../../model/lib/commentsTree';
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
    // <div>
    //   {comments?.map((i) => (
    //     <Item
    //       id={i.id}
    //       key={i.id}
    //       postId={i.postId}
    //       text={i.text}
    //       count={i._count.replies}
    //       prepopulate={replyToId === null}
    //     />
    //   ))}
    // </div>
  );
}

// interface CommentsListProps {
//   comments: CommentWithChildren[];
// }

// export async function CommentsList({ comments }: CommentsListProps) {
//   const session = await getAuthSession();

//   return (
//     <>
//       {comments.map((comment) => {
//         const votesAmount = comment.votes.reduce((acc, vote) => {
//           if (vote.type === 'UP') return acc + 1;
//           if (vote.type === 'DOWN') return acc - 1;
//           return acc;
//         }, 0);

//         const currentVote = comment.votes.find(
//           (vote) => vote.userId === session?.user.id
//         );

//         return (
//           <Fragment key={comment.id}>
//             <div className="mb-2">
//               <Comment
//                 comment={comment}
//                 currentVote={currentVote}
//                 votesAmt={votesAmount}
//                 postId={comment.postId}
//               />
//             </div>

//             {comment.children.length ? (
//               <div className="ml-3 border-l-2 border-zinc-200 py-2 pl-4">
//                 <CommentsList comments={comment.children} />
//               </div>
//             ) : null}
//           </Fragment>
//         );
//       })}
//     </>
//   );
// }
