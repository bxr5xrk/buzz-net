'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
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

export function SearchBar() {
  const [input, setInput] = useState<string>('');
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput('');
  });

  const request = useDebounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched
  } = useSearch(input);

  useEffect(() => {
    setInput('');
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search communities..."
      />

      {input.length > 0 && (
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-white shadow">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {queryResults?.map((community) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/r/${e}`);
                    router.refresh();
                  }}
                  key={community.id}
                  value={community.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/r/${community.name}`}>r/{community.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
}
