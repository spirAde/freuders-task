import axios from 'axios';
import { ENDPOINT_BASE, SUCCESS_RESPONSE } from './constants';

const instance = axios.create({
  baseURL: ENDPOINT_BASE,
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.result === SUCCESS_RESPONSE) {
      return response;
    }

    return Promise.reject(response.data.error);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
