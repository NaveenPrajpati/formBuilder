import axios from 'axios';
import {ImageUploadApi} from '../service/endPoints';
import moment from 'moment';
import {Asset} from 'react-native-image-picker';

export const uploadImage = async (image: Asset) => {
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

export const formatDateTime = (
  dateTime: moment.MomentInput,
  format = 'HH:mm A MMM DD,YYYY',
) => {
  // "YYYY-MM-DD": 2024-12-15
  // "MM/DD/YYYY": 12/15/2024
  // "DD-MM-YYYY HH:mm A": 15-12-2024 02:30 PM
  // "dddd, MMMM Do YYYY, h:mm:ss A": Sunday, December 15th 2024, 2:30:00 PM
  // "YYYY-MM-DDTHH:mm:ssZ": 2024-12-15T14:30:00Z (ISO format)

  if (!dateTime) return 'Invalid Date';
  return moment(dateTime).format(format);
};
