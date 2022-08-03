const authMiddleware = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export { authMiddleware };
