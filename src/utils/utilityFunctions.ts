import axios from 'axios';
import {ImageUploadApi} from '../service/endPoints';

export const uploadImage = async image => {
  const data = new FormData();
  data.append('image', {
    uri: image.uri,
    type: image.type,
    name: image.fileName,
  });

  try {
    const response = await axios.post(ImageUploadApi, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Upload Failed:', error);
    throw error;
  }
};
