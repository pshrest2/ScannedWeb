const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_BASE_URL_LOCAL;
  } else {
    return process.env.REACT_APP_BASE_URL_PROD;
  }
};

export default getBaseUrl;
