export const parseHTML = (data: any) => {
  const titleMatch = data.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  const descriptionMatch = data.match(
    /<meta name="description" content="(.*?)"/
  );

  const description = descriptionMatch ? descriptionMatch[1] : '';

  const imageMatch = data.match(/<meta property="og:image" content="(.*?)"/);

  const image = imageMatch ? imageMatch[1] : '';

  return { image, description, title };
};
