import { cl } from '@/shared/lib';
import { usePrevious } from '@/shared/lib/hooks/usePrevious';
import { Button } from '@/shared/ui/Button';
import { CommentVote } from '@prisma/client';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useState } from 'react';
import { useVoteComment } from '../../model/service/commentService';

interface CommentVotesProps {
  commentId: string;
  votesAmount: number;
  currentVote?: Pick<CommentVote, 'type'>;
}

export function CommentVotes({
  currentVote: _currentVote,
  votesAmount: _votesAmount,
  commentId
}: CommentVotesProps) {
  const [votesAmt, setVotesAmt] = useState(_votesAmount);
  const [currentVote, setCurrentVote] = useState<
    Pick<CommentVote, 'type'> | undefined
  >(_currentVote);
  const prevVote = usePrevious(currentVote);

  const { mutate: onVote } = useVoteComment({
    commentId,
    onErrorHandler(voteType) {
      if (voteType === 'UP') setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);
    },
    onMutateHandler(type) {
      if (currentVote?.type === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote({ type });
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN')
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    }
  });

  return (
    <div className="flex gap-1">
      {/* upvote */}
      <Button
        onClick={() => onVote('UP')}
        size="xs"
        theme="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cl('h-5 w-5 text-zinc-700', {
            'fill-emerald-500 text-emerald-500': currentVote?.type === 'UP'
          })}
        />
      </Button>

      {/* score */}
      <p className="px-1 py-2 text-center text-xs font-medium text-zinc-900">
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        onClick={() => onVote('DOWN')}
        size="xs"
        className={cl({
          'text-emerald-500': currentVote?.type === 'DOWN'
        })}
        theme="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cl('h-5 w-5 text-zinc-700', {
            'fill-red-500 text-red-500': currentVote?.type === 'DOWN'
          })}
        />
      </Button>
    </div>
  );
}
