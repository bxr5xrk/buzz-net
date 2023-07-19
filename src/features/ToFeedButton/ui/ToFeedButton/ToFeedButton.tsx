'use client';

import { buttonVariants } from '@/shared/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const ToFeedButton = () => {
  const pathname = usePathname();

  const subredditPath = getSubredditPath(pathname);

  return (
    <a href={subredditPath} className={buttonVariants({ theme: 'ghost' })}>
      <ChevronLeft className="mr-1 h-4 w-4" />
      {subredditPath === '/' ? 'Back home' : 'Back to community'}
    </a>
  );
};

const getSubredditPath = (pathname: string) => {
  const splitPath = pathname.split('/');

  if (splitPath.length === 3) return '/';
  else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`;
  else return '/';
};
