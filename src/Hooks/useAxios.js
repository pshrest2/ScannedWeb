import axios from 'axios';
import getBaseUrl from '../Helpers/getBaseUrl';

const useAxios = () => {
  const postForm = axios.create({
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return { postForm };
};

export default useAxios;
