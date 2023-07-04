import { useCustomToasts } from '@/shared/lib/hooks/useCustomToast';
import { toast } from '@/shared/lib/hooks/useToast';
import { CreateSubredditPayload } from '@/shared/validators';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export const useCreateCommunity = (communityName: string) => {
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: communityName,
      };

      const { data } = await axios.post('/api/subreddit', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Subreddit already exists.',
            description: 'Please choose a different name.',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid subreddit name.',
            description: 'Please choose a name between 3 and 21 letters.',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create subreddit.',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });
};
