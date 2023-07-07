import { toast } from '@/shared/lib/hooks/useToast';
import { CommentRequest } from '@/shared/lib/validators/comment';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateComment = ({
  onSuccessHandler
}: {
  onSuccessHandler: VoidFunction;
}) => {
  return useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch(
        '/api/subreddit/post/comment/',
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
