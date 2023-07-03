import { buttonVariants } from '@/shared/ui/Button/config';
import Link from 'next/link';
import { toast } from './useToast';

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href="/sign-in"
          className={buttonVariants({ theme: 'outline' })}
        >
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
};
