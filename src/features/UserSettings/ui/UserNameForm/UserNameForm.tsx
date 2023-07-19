'use client';

import { cl } from '@/shared/lib';
import { UsernameValidator } from '@/shared/lib/validators/username';
import { Button } from '@/shared/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '../../types/settings';
import { useUsername } from '../model/service/settingsService';

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'username'>;
}

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || ''
    }
  });

  const { mutate: onChangeUsername, isLoading } = useUsername();

  return (
    <form
      className={cl(className)}
      onSubmit={handleSubmit((e) => onChangeUsername(e))}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute left-0 top-0 grid h-10 w-8 place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px] pl-6"
              size={32}
              {...register('name')}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Change name</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
