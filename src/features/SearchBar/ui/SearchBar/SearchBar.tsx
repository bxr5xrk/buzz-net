'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Users } from 'lucide-react';
import { useDebounce, useOnClickOutside } from '@/shared/lib/hooks';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/ui/Command';
import { useSearch } from '../../model/service/searchService';
import Link from 'next/link';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    if (searchQuery.length) setSearchQuery('');
  });

  const onChange = useDebounce(() => {
    refetch();
  }, 400);

  const { isFetching, data, refetch, isFetched } = useSearch(searchQuery);

  useEffect(() => {
    setSearchQuery('');
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setSearchQuery(text);
          onChange();
        }}
        value={searchQuery}
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search communities..."
      />

      {searchQuery.trim().length > 0 && (
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-white shadow">
          {isFetched && !data?.length ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : null}

          {data?.length ? (
            <CommandGroup heading="Communities">
              {data?.map((community) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/r/${e}`);
                    router.refresh();
                  }}
                  key={community.id}
                  value={community.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <Link
                    className="cursor-pointer"
                    href={`/r/${community.name}`}
                  >
                    r/{community.name}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
}
