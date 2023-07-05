'use client';

import { CommunityName } from '@/entities/Community/model/types/community';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/shared/const';
import { useIntersection } from '@/shared/lib/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { CommunityPost } from '../../model/types/post';
import { Post } from '../Post/Post';

interface PostFeedProps {
  communityName: CommunityName;
  initialPosts: CommunityPost[];
}

export function PostFeed({ communityName, initialPosts }: PostFeedProps) {
  const intersectedAreaRef = useRef<HTMLElement>(null);

  const { data: session } = useSession();

  const { ref, entry } = useIntersection({
    root: intersectedAreaRef.current,
    threshold: 1
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    CommunityPost[]
  >(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!communityName ? `&communityName=${communityName}` : '');

      const { data } = await axios.get(query);
      return data;
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] }
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="col-span-2 flex flex-col space-y-6">
      {posts.map((post, index) => {
        const votesAmount = post.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1;
          if (vote.type === 'DOWN') return acc - 1;
          return acc;
        }, 0);

        const currentVoteType = post.votes.find(
          (vote) => vote.userId === session?.user.id
        )?.type;

        if (index === posts.length - 1) {
          return (
            <li className="rounded-md bg-white shadow" ref={ref} key={post.id}>
              <Post
                id={post.id}
                authorUsername={post.author.username}
                content={post.content}
                communityName={post.community.name}
                createdAt={post.createdAt}
                title={post.title}
                commentsAmount={post.comments.length}
                votesAmount={votesAmount}
                currentVoteType={currentVoteType}
              />
            </li>
          );
        }

        return (
          <li className="rounded-md bg-white shadow" key={post.id}>
            <Post
              key={post.id}
              id={post.id}
              authorUsername={post.author.username}
              content={post.content}
              communityName={post.community.name}
              createdAt={post.createdAt}
              title={post.title}
              commentsAmount={post.comments.length}
              votesAmount={votesAmount}
              currentVoteType={currentVoteType}
            />
          </li>
        );
      })}

      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </li>
      )}
    </ul>
  );
}
