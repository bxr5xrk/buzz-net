import { FormData } from '@/features/UserSettings/types/settings';
import { toast } from '@/shared/lib/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export const useUsername = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ name }: FormData) => {
      const payload: FormData = { name };

      const { data } = await axios.patch('/api/username/', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Username already taken.',
            description: 'Please choose another username.',
            variant: 'destructive'
          });
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your username was not updated. Please try again.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        description: 'Your username has been updated.'
      });
      router.refresh();
    }
  });
};
