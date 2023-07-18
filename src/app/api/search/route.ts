import { db } from '@/shared/lib/db/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');

  if (!q) return new Response(JSON.stringify([]));

  const results = await db.community.findMany({
    where: {
      name: {
        contains: q
      }
    },
    include: {
      _count: true
    },
    take: 5
  });

  return new Response(JSON.stringify(results));
}
