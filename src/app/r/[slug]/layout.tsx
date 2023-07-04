import { CommunityInfo } from '@/entities/Community';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
};

const Layout = async ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        {/* <ToFeedButton /> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

          {/* info sidebar */}
          {/* @ts-expect-error Server Component */}
          <CommunityInfo slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
