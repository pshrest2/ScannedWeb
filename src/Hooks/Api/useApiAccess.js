import useAxios from '../useAxios';

const useApiAccess = () => {
  const { postForm } = useAxios();
  const fetchReceiptData = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);

    const response = await postForm.post('api/FormRecognizer/Upload', formData);
    if (response.status === 200) return response.data;
    return {};
  };

  return { fetchReceiptData };
};

export default useApiAccess;
