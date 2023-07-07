import { PostId } from '@/entities/Post/model/types/post';
import { useLoginToast } from '@/shared/lib/hooks';
import { toast } from '@/shared/lib/hooks/useToast';
import { PostVoteRequest } from '@/shared/lib/validators/vote';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { VoteType } from '../types/vote';

export const useVote = ({
  postId,
  onErrorHandler,
  onMutateHandler
}: {
  postId: PostId;
  onErrorHandler: (type: VoteType) => void;
  onMutateHandler: (type: VoteType) => void;
}) => {
  const loginToast = useLoginToast();

  return useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId
      };

      await axios.patch('/api/community/post/vote', payload);
    },
    onError: (err, voteType) => {
      onErrorHandler(voteType);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your vote was not registered. Please try again.',
        variant: 'destructive'
      });
    },
    onMutate: (type: VoteType) => {
      onMutateHandler(type);
    }
  });
};
