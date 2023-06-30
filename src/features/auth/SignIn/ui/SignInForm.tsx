'use client';

import { Button, Icons } from '@/shared';
import { cl } from '@/shared/lib';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useToast } from '@/shared/lib/hooks';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SignInForm = ({ className, ...props }: UserAuthFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn('google');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};
