'use client';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useCreateCommunity } from '../../model/servises/communityService';

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
      className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Create a Community</h1>
      </div>

      <hr className="bg-red-500 h-px" />

      <div>
        <p className="text-lg font-medium">Name</p>
        <p className="text-xs pb-2">
          Community names including capitalization cannot be changed.
        </p>
        <div className="relative">
          <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
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
