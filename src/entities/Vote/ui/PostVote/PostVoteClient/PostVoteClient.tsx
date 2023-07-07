'use client';

import { PostId } from '@/entities/Post/model/types/post';
import { useVote } from '@/entities/Vote/model/service/voteService';
import { cl } from '@/shared/lib';
import { usePrevious } from '@/shared/lib/hooks/usePrevious';
import { Button } from '@/shared/ui/Button';
import { VoteType } from '@prisma/client';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PostVoteClientProps {
  postId: PostId;
  initialVotesAmount: number;
  initialVote?: VoteType;
}

export function PostVoteClient({
  postId,
  initialVote,
  initialVotesAmount
}: PostVoteClientProps) {
  const [votesAmt, setVotesAmt] = useState(initialVotesAmount);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  // sync with server
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: onVote, isLoading } = useVote({
    postId,
    onErrorHandler: (voteType) => {
      if (voteType === 'UP') setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);
      // reset current vote
      setCurrentVote(prevVote);
    },
    onMutateHandler(type) {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);

        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN')
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    }
  });

  return (
    <div className="flex flex-col gap-4 pb-4 pr-6 sm:w-20 sm:gap-0 sm:pb-0">
      {/* upvote */}
      <Button
        disabled={isLoading}
        onClick={() => onVote('UP')}
        size="sm"
        theme="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cl('h-5 w-5 text-zinc-700', {
            'fill-emerald-500 text-emerald-500': currentVote === 'UP'
          })}
        />
      </Button>

      {/* score */}
      <p className="py-2 text-center text-sm font-medium text-zinc-900">
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        disabled={isLoading}
        onClick={() => onVote('DOWN')}
        size="sm"
        className={cl({
          'text-emerald-500': currentVote === 'DOWN'
        })}
        theme="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cl('h-5 w-5 text-zinc-700', {
            'fill-red-500 text-red-500': currentVote === 'DOWN'
          })}
        />
      </Button>
    </div>
  );
}
