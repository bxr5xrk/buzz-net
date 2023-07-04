'use client';

import { Icons } from '@/shared';
import { cl } from '@/shared/lib';
import { Button } from '@/shared/ui/Button';
import { useAuth } from '../../model/services/authByGoogle/authByGoogle';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function AuthUsingGoogle({ className, ...props }: UserAuthFormProps) {
  const { mutateAsync: onSignIn, isLoading } = useAuth();

  const loginWithGoogle = async () => {
    await onSignIn();
  };

  return (
    <div className={cl('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  );
}
