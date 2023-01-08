import useAxios from '../useAxios';

const useApiAccess = () => {
  const { postForm, post } = useAxios();
  const fetchReceiptData = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);

    const response = await postForm.post(
      'form-recognizer/upload/file',
      formData
    );
    return response;
  };

  const fetchReceiptDataUrl = async (url) => {
    const response = await post.post('form-recognizer/upload/url', url);
    if (response.status === 200) return response.data;
    return {};
  };

  const login = async (dto) => await post.post('auth/login', dto);

  return { fetchReceiptData, fetchReceiptDataUrl, login };
};

export default useApiAccess;
