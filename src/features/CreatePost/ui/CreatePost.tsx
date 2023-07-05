import { Editor, SubmitCreating } from '@/entities/Post';

interface CreatePostProps {
  slug: string;
  communityId: string;
}

export function CreatePost({ slug, communityId }: CreatePostProps) {
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

      <Editor communityId={communityId} />

      <SubmitCreating />
    </div>
  );
}
