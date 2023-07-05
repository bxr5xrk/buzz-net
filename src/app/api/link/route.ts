import { parseHTML } from '@/shared/lib';
import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get('url');

  if (!href) {
    return new Response('Invalid href', { status: 400 });
  }

  const res = await axios.get(href);

  const { image, description, title } = parseHTML(res.data);

  // Return the data in the format required by the editor tool
  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: image
        }
      }
    })
  );
}
