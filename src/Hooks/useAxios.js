import axios from 'axios';
import getBaseUrl from '../Helpers/getBaseUrl';

const useAxios = () => {
  const postForm = axios.create({
    method: 'POST',
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const post = axios.create({
    method: 'POST',
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { post, postForm };
};

export default useAxios;
