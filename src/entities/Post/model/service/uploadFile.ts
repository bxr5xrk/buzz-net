import axios from 'axios';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('key', process.env.IMGBB_API_KEY ?? '');

  const res = await axios.post<{
    data: {
      image: { url: string };
    };
  }>('https://api.imgbb.com/1/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data.data.image.url;
};
