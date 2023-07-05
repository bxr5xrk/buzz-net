import { useCommunityId } from '@/entities/Community/model/service/dbService';
import { CreatePost } from '@/features/CreatePost';
import { notFound } from 'next/navigation';

interface CreatePostPageProps {
  params: {
    slug: string;
  };
}

export default async function CreatePostPage({
  params: { slug }
}: CreatePostPageProps) {
  const community = await useCommunityId(slug);

  if (!community) return notFound();

  return <CreatePost communityId={community.id} slug={slug} />;
}
