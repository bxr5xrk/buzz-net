'use client';

import { Button } from '@/shared/ui/Button';
import {
  useSubscribeCommunity,
  useUnsubscribeCommunity,
} from '../../model/service/communityService';

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}

export const SubscribeOrLeaveCommunity = ({
  isSubscribed,
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps) => {
  const { mutate: onSubscribe, isLoading: isLoadingSubscribe } =
    useSubscribeCommunity({
      subredditId,
      subredditName,
    });
  const { mutate: onUnsubscribe, isLoading: isLoadingUnsubscribe } =
    useUnsubscribeCommunity({
      subredditId,
      subredditName,
    });

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isLoadingUnsubscribe}
      onClick={() => onUnsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isLoadingSubscribe}
      onClick={() => onSubscribe()}
    >
      Join to post
    </Button>
  );
};
