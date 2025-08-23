const asyncHandler = (fun) => {
  return (req, res, next) => {
    Promise.resolve(fun(req, res, next)).catch((error) => next(error));
  };
};

export default asyncHandler;
