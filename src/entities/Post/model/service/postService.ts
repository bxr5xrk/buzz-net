import { CommunityName } from '@/entities/Community/model/types/community';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/shared/const';
import { toast } from '@/shared/lib/hooks/useToast';
import { PostCreationRequest } from '@/shared/lib/validators/post';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { CommunityPost } from '../types/post';

export const useCreatePost = () => {
  const pathname = usePathname();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      title,
      content,
      communityId
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content, communityId };
      const { data } = await axios.post('/api/community/post/create', payload);
      return data;
    },
    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not published. Please try again.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/create into /r/mycommunity
      const newPathname = pathname.split('/').slice(0, -1).join('/');
      router.push(newPathname);

      router.refresh();

      return toast({
        description: 'Your post has been published.'
      });
    }
  });
};

export const useInfinitePosts = ({
  initialPosts,
  communityName
}: {
  initialPosts: CommunityPost[];
  communityName?: CommunityName;
}) => {
  return useInfiniteQuery<CommunityPost[]>(
    ['infinite-query', communityName],
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
};
