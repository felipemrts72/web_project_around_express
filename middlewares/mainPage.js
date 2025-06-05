const mainPage = (req, res, next) => {
  if (req.url === "/") {
    const err = new Error("NotFound");
    err.name = "NotFound";
    return next(err);
  }
  return next();
};

module.exports = mainPage;
