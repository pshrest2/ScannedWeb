import axios from 'axios';
import authHeader from '../Helpers/authHeader';
import getBaseUrl from '../Helpers/getBaseUrl';

const useAxios = () => {
  const postForm = axios.create({
    method: 'POST',
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'multipart/form-data',
      ...authHeader(),
    },
  });

  const post = axios.create({
    method: 'POST',
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  });

  return { post, postForm };
};

export default useAxios;
