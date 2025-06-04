const mainPage = (req, res, next) => {
  if (req.url === "/") {
    return res.status(404).json({
      message: "A solicitação não foi encontrada, página ainda em produção",
    });
  }
  return next();
};
