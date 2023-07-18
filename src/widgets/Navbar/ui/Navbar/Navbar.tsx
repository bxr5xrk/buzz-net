import { SearchBar } from '@/features/SearchBar';
import { Icons } from '@/shared';
import Link from 'next/link';
import { Action } from '../Action/Action';

export const Navbar = async () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-lg font-medium text-zinc-700 md:block">
            Buzz Net
          </p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {/* @ts-expect-error Server Component */}
        <Action />
      </div>
    </div>
  );
};
