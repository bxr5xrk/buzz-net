import { db } from '@/shared/lib/db/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const post_id = url.searchParams.get('post_id');
    const reply_to_id = url.searchParams.get('reply_to_id');
    // req.
    // const { post_id, reply_to_id } = context.params;

    if (!post_id) {
      return new Response('Pass postId', { status: 500 });
    }

    const comments = await db.comment.findMany({
      where: {
        postId: post_id,
        replyToId: reply_to_id
      },
      include: {
        author: true,
        votes: true,
        _count: {
          select: {
            replies: true
          }
        }
      }
    });

    return new Response(JSON.stringify(comments));
  } catch (error) {
    return new Response(
      'Could not unsubscribe from community at this time. Please try later',
      { status: 500 }
    );
  }
}
