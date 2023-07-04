import { useLoginToast } from '@/shared/lib/hooks/useLoginToast';
import { toast } from '@/shared/lib/hooks/useToast';
import { SubscribeToSubredditPayload } from '@/shared/validators';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export const useSubscribeCommunity = ({
  subredditId,
  subredditName
}: {
  subredditId: string;
  subredditName: string;
}) => {
  const loginToast = useLoginToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId
      };

      const { data } = await axios.post('/api/subreddit/subscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'There was a problem.',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: 'Subscribed!',
        description: `You are now subscribed to r/${subredditName}`
      });
    }
  });
};

export const useUnsubscribeCommunity = ({
  subredditId,
  subredditName
}: {
  subredditId: string;
  subredditName: string;
}) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId
      };

      const { data } = await axios.post('/api/subreddit/unsubscribe', payload);
      return data as string;
    },
    onError: (err: AxiosError) => {
      toast({
        title: 'Error',
        description: err.response?.data as string,
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: 'Unsubscribed!',
        description: `You are now unsubscribed from/${subredditName}`
      });
    }
  });
};
