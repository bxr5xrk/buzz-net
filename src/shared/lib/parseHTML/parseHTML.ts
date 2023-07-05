import { AxiosResponse } from 'axios';

export const parseHTML = (res: AxiosResponse) => {
  const titleMatch = res.data.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  const descriptionMatch = res.data.match(
    /<meta name="description" content="(.*?)"/
  );

  const description = descriptionMatch ? descriptionMatch[1] : '';

  const imageMatch = res.data.match(
    /<meta property="og:image" content="(.*?)"/
  );

  const image = imageMatch ? imageMatch[1] : '';

  return { image, description, title };
};
