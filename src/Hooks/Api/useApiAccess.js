import axios from 'axios';

const useApiAccess = () => {
  const baseURL = 'https://localhost:8081/api';

  const fetchReceiptData = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);

    const response = await axios.post(
      `${baseURL}/FormRecognizer/Upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.status === 200) return response.data;
    return {};
  };

  return { fetchReceiptData };
};

export default useApiAccess;
