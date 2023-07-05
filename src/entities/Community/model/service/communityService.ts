import { useLoginToast } from '@/shared/lib/hooks/useLoginToast';
import { toast } from '@/shared/lib/hooks/useToast';
import {
  CreateCommunityPayload,
  SubscribeToCommunityPayload
} from '@/shared/validators/community';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export const useCreateCommunity = (communityName: string) => {
  const loginToast = useLoginToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const payload: CreateCommunityPayload = {
        name: communityName
      };

      const { data } = await axios.post('/api/community', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Community already exists.',
            description: 'Please choose a different name.',
            variant: 'destructive'
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid community name.',
            description: 'Please choose a name between 3 and 21 letters.',
            variant: 'destructive'
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create community.',
        variant: 'destructive'
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    }
  });
};

export const useSubscribeCommunity = ({
  communityId,
  communityName
}: {
  communityId: string;
  communityName: string;
}) => {
  const loginToast = useLoginToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId
      };

      const { data } = await axios.post('/api/community/subscribe', payload);
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
        description: `You are now subscribed to r/${communityName}`
      });
    }
  });
};

export const useUnsubscribeCommunity = ({
  communityId,
  communityName
}: {
  communityId: string;
  communityName: string;
}) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId
      };

      const { data } = await axios.post('/api/community/unsubscribe', payload);
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
        description: `You are now unsubscribed from/${communityName}`
      });
    }
  });
};
