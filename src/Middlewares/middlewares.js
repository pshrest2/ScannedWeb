const authMiddleware = () => (next) => (action) => {
  console.log(action);
  next(action);
};

export { authMiddleware };
