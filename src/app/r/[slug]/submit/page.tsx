import { useCommunityId } from '@/entities/Community/model/service/dbService';
import { Button } from '@/shared/ui/Button';
import { Editor } from '@/widgets/Editor';
import { notFound } from 'next/navigation';

interface SubmitPageProps {
  params: {
    slug: string;
  };
}

export default async function SubmitPage({
  params: { slug }
}: SubmitPageProps) {
  const community = await useCommunityId(slug);

  if (!community) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      {/* heading */}
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create Post
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            in r/{slug}
          </p>
        </div>
      </div>

      {/* form */}
      <Editor communityId={community.id} />

      <div className="flex w-full justify-end">
        <Button type="submit" className="w-full" form="community-post-form">
          Post
        </Button>
      </div>
    </div>
  );
}
