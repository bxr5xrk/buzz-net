import { useToast } from '@/shared/lib/hooks';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export const useAuth = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      signIn('google');
    },
    onError: () =>
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive'
      })
  });
};
