import { toast } from './useToast';
import { buttonVariants } from '@/shared/ui/Button/config/config';
import Link from 'next/link';

export const useLoginToast = () => () => {
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
    )
  });
};
