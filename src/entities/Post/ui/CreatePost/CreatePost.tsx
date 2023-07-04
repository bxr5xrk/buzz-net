'use client';

import { UserAvatar } from '@/features/UserAvatar';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Image as ImageIcon, Link2 } from 'lucide-react';
import type { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';

interface CreatePostProps {
  session: Session | null;
}

export function CreatePost({ session }: CreatePostProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar
            name={session?.user.name || null}
            image={session?.user.image || null}
          />

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>
        <Input
          onClick={() => router.push(pathname + '/submit')}
          readOnly
          placeholder="Create post"
        />
        <Button onClick={() => router.push(pathname + '/submit')} theme="ghost">
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button onClick={() => router.push(pathname + '/submit')} theme="ghost">
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
}
