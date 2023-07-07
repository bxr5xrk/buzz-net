import { PostDetails } from '@/entities/Post/ui/PostDetails/PostDetails';

interface PostPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function PostPage({ params: { postId } }: PostPageProps) {
  return (
    <div>
      {/* @ts-expect-error server component */}
      <PostDetails postId={postId} />
    </div>
  );
}
