export const nanoid = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let nanoid = '';

  for (let i = 0; i < length; i++) {
    nanoid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return nanoid;
};
