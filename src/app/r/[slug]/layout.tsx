import { CommunityInfo } from '@/entities/Community/ui/CommunityInfo/CommunityInfo';
import { APP_NAME } from '@/shared/const/appName';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'A Reddit clone built with Next.js and TypeScript.'
};

const Layout = async ({
  children,
  params: { slug }
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  return (
    <div className="mx-auto h-full max-w-7xl pt-12 sm:container">
      <div>
        {/* <ToFeedButton /> */}

        <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
          <ul className="col-span-2 flex flex-col space-y-6">{children}</ul>

          {/* @ts-expect-error Server Component */}
          <CommunityInfo slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
