'use client';

import { UserAvatar } from '@/shared/ui/UserAvatar';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Image as ImageIcon, Link2 } from 'lucide-react';
import type { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';

interface CreatePostAreaProps {
  session: Session | null;
}

export function CreatePostArea({ session }: CreatePostAreaProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="flex h-full justify-between gap-6 px-6 py-4">
        <div className="relative">
          <UserAvatar
            name={session?.user.name || null}
            image={session?.user.image || null}
          />

          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 outline outline-2 outline-white" />
        </div>
        <Input
          onClick={() => router.push(pathname + '/create')}
          readOnly
          placeholder="Create post"
        />
        <Button onClick={() => router.push(pathname + '/create')} theme="ghost">
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button onClick={() => router.push(pathname + '/create')} theme="ghost">
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
}
