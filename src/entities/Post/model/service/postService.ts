import { toast } from '@/shared/lib/hooks/useToast';
import { PostCreationRequest } from '@/shared/validators/post';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

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
