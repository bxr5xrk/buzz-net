import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import {
  useCommunity,
  useCommunityMemberCount,
  useIsUserSubscribed
} from '../../model/service/dbService';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { buttonVariants } from '@/shared/ui/Button';
import Link from 'next/link';
import { SubscribeOrLeaveCommunity } from '../SubscribeOrLeaveCommunity/SubscribeOrLeaveCommunity';

interface CommunityInfoProps {
  slug: string;
}

export async function CommunityInfo({ slug }: CommunityInfoProps) {
  const session = await getAuthSession();

  const community = await useCommunity(slug);

  const memberCount = await useCommunityMemberCount(slug);

  const user = await useIsUserSubscribed({ slug, id: session?.user.id });

  const subscription = !session?.user ? undefined : user;

  const isSubscribed = !!subscription;

  if (!community) return notFound();

  return (
    <div className="order-first h-fit overflow-hidden rounded-lg border border-gray-200 md:order-last">
      <div className="px-6 py-4">
        <p className="py-3 font-semibold">About r/{community.name}</p>
      </div>
      <dl className="divide-y divide-gray-100 bg-white px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Created</dt>
          <dd className="text-gray-700">
            <time dateTime={community.createdAt.toDateString()}>
              {format(community.createdAt, 'MMMM d, yyyy')}
            </time>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Members</dt>
          <dd className="flex items-start gap-x-2">
            <div className="text-gray-900">{memberCount}</div>
          </dd>
        </div>

        {community.creatorId === session?.user?.id ? (
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">You created this community</dt>
          </div>
        ) : null}

        {community.creatorId !== session?.user?.id ? (
          <SubscribeOrLeaveCommunity
            isSubscribed={isSubscribed}
            communityId={community.id}
            communityName={community.name}
          />
        ) : null}

        {isSubscribed ? (
          <Link
            className={buttonVariants({
              theme: 'outline',
              className: 'mb-6 w-full'
            })}
            href={`r/${slug}/create`}
          >
            Create Post
          </Link>
        ) : null}
      </dl>
    </div>
  );
}
