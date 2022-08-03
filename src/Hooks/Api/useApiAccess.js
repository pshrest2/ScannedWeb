import useAxios from '../useAxios';

const useApiAccess = () => {
  const { postForm, post } = useAxios();
  const fetchReceiptData = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);

    const response = await postForm.post(
      'api/form-recognizer/upload/file',
      formData
    );
    if (response.status === 200) return response.data;
    return {};
  };

  const fetchReceiptDataUrl = async (url) => {
    const response = await post.post('api/form-recognizer/upload/url', url);
    if (response.status === 200) return response.data;
    return {};
  };

  const login = async (dto) => {
    const response = await post.post('api/auth/login', dto);
    if (response.status !== 200) return null;

    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  };
  return { fetchReceiptData, fetchReceiptDataUrl, login };
};

export default useApiAccess;
