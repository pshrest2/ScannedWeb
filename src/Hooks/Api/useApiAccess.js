import axios from 'axios';
import getBaseUrl from '../../Helpers/getBaseUrl';

const useApiAccess = () => {
  const fetchReceiptData = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);

    const response = await axios.post(
      `${getBaseUrl()}/api/FormRecognizer/Upload`,
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
