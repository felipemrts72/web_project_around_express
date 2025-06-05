const userId = (req, res, next) => {
  req.user = {
    _id: "683e6e39ec2eb288b1efeedf",
  };

  next();
};

module.exports = userId;
