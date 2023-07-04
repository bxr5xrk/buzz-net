'use client';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useCreateCommunity } from '../../model/service/communityService';

export function CreateCommunityForm() {
  const [communityName, setCommunityName] = useState('');
  const router = useRouter();

  const { mutate: onCreateCommunity, isLoading } =
    useCreateCommunity(communityName);

  const onCreate = () => {
    onCreateCommunity();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCreate();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative h-fit w-full space-y-6 rounded-lg bg-white p-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create a Community</h1>
      </div>

      <hr className="h-px bg-red-500" />

      <div>
        <p className="text-lg font-medium">Name</p>
        <p className="pb-2 text-xs">
          Community names including capitalization cannot be changed.
        </p>
        <div className="relative">
          <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-400">
            r/
          </p>
          <Input
            required
            minLength={3}
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            className="pl-6"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          disabled={isLoading}
          theme="subtle"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={communityName.length === 0}
        >
          Create Community
        </Button>
      </div>
    </form>
  );
}
