import { AuthorUsername } from '@/entities/Author/model/types/author';
import {
  PostContent,
  PostId,
  PostTitle
} from '@/entities/Post/model/types/post';
import { getAuthSession } from '@/shared/lib/auth/auth';
import { redis } from '@/shared/lib/config';
import { db } from '@/shared/lib/db/db';
import { PostVoteValidator } from '@/shared/lib/validators/vote';
import { CachedPost } from '@/types/redis';
import { Vote, VoteType } from '@prisma/client';
import { z } from 'zod';

const CACHE_AFTER_UPVOTES = 1;

interface cachePostProps {
  votes: Vote[];
  username: AuthorUsername;
  content: PostContent;
  currentVote: VoteType | null;
  createdAt: Date;
  id: PostId;
  title: PostTitle;
}

const cachePost = async ({
  votes,
  username,
  content,
  currentVote,
  createdAt,
  id,
  title
}: cachePostProps) => {
  const votesAmount = votes.reduce(
    (acc, vote) => (vote.type === 'UP' ? acc + 1 : acc - 1),
    0
  );

  if (votesAmount >= CACHE_AFTER_UPVOTES) {
    const cachePayload: CachedPost = {
      authorUsername: username ?? '',
      content: JSON.stringify(content),
      id,
      title,
      currentVote,
      createdAt
    };

    await redis.hset(`post:${id}`, cachePayload); // Store the post data as a hash
  }
};

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, voteType } = PostVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // check if user has already voted on this post
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId
      }
    });

    const post = await db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        author: true,
        votes: true
      }
    });

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    if (existingVote) {
      // if vote type is the same as existing vote, delete the vote
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_postId: {
              postId,
              userId: session.user.id
            }
          }
        });

        // Recount the votes
        await cachePost({
          votes: post.votes,
          username: post.author.username ?? '',
          content: post.content,
          id: post.id,
          title: post.title,
          currentVote: null,
          createdAt: post.createdAt
        });

        return new Response('OK');
      }

      // if vote type is different, update the vote
      await db.vote.update({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id
          }
        },
        data: {
          type: voteType
        }
      });

      // Recount the votes
      await cachePost({
        votes: post.votes,
        username: post.author.username ?? '',
        content: post.content,
        id: post.id,
        title: post.title,
        currentVote: voteType,
        createdAt: post.createdAt
      });

      return new Response('OK');
    }

    // if no existing vote, create a new vote
    await db.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        postId
      }
    });

    // Recount the votes
    await cachePost({
      votes: post.votes,
      username: post.author.username ?? '',
      content: post.content,
      id: post.id,
      title: post.title,
      currentVote: voteType,
      createdAt: post.createdAt
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      'Could not post to community at this time. Please try later',
      { status: 500 }
    );
  }
}
