'use client';

import { Button } from '@/shared/ui/Button';
import {
  useSubscribeCommunity,
  useUnsubscribeCommunity
} from '../../model/service/communityService';

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  communityId: string;
  communityName: string;
}

export const SubscribeOrLeaveCommunity = ({
  isSubscribed,
  communityId,
  communityName
}: SubscribeLeaveToggleProps) => {
  const { mutate: onSubscribe, isLoading: isLoadingSubscribe } =
    useSubscribeCommunity({
      communityId,
      communityName
    });

  const { mutate: onUnsubscribe, isLoading: isLoadingUnsubscribe } =
    useUnsubscribeCommunity({
      communityId,
      communityName
    });

  return isSubscribed ? (
    <Button
      className="mb-4 mt-1 w-full"
      isLoading={isLoadingUnsubscribe}
      onClick={() => onUnsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="mb-4 mt-1 w-full"
      isLoading={isLoadingSubscribe}
      onClick={() => onSubscribe()}
    >
      Join to community
    </Button>
  );
};
