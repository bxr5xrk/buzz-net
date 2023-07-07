import { useLoginToast } from './../../../../shared/lib/hooks/useLoginToast';
import { toast } from '@/shared/lib/hooks/useToast';
import { CommentRequest } from '@/shared/lib/validators/comment';
import { CommentVoteRequest } from '@/shared/lib/validators/vote';
import { VoteType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export const useCreateComment = ({
  onSuccessHandler
}: {
  onSuccessHandler: VoidFunction;
}) => {
  return useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch(
        '/api/community/post/comment/',
        payload
      );
      return data;
    },

    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: "Comment wasn't created successfully. Please try again.",
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      onSuccessHandler();
    }
  });
};

export const useVoteComment = ({
  commentId,
  onErrorHandler,
  onMutateHandler
}: {
  commentId: string;
  onErrorHandler: (voteType: VoteType) => void;
  onMutateHandler: (type: VoteType) => void;
}) => {
  const loginToast = useLoginToast();

  return useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: CommentVoteRequest = {
        voteType: type,
        commentId
      };

      await axios.patch('/api/subreddit/post/comment/vote', payload);
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
