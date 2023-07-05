import axios from 'axios';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('key', '86894b25bd9f2d5a7bd0c1b7d429aebd'); // Add your specific key here

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
