import axios from 'axios';
const BaseUrl = __DEV__
  ? 'http://192.168.0.155:4000/api'
  : 'https://formbuilderback.onrender.com/api';

export const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  err => {
    console.log('request error-', err);
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response) {
      const {status} = error.response;
      if (status === 401) {
        console.error('Unauthorized. Redirect to login or refresh token.');
        await handleUnauthorized();
      } else if (status === 403) {
        console.error('Forbidden: Insufficient permissions.');
      } else if (status >= 500) {
        console.error('Server error. Please try again later.');
      }
    } else {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  },
);

// Example: Mock token fetch logic
const getToken = async (): Promise<string | null> => {
  // Retrieve token from secure storage or AsyncStorage
  return null; // Replace with actual token logic
};

// Example: Handle 401 Unauthorized
const handleUnauthorized = async () => {
  // Clear token, redirect to login, or refresh token
  console.log('Handling 401...');
};
