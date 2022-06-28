const jwt = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  //   const RSA_PRIVATE_KEY = 'somekey'

  const token = req.header("x-access-token");
  //console.log(req.header("x-access-token"))

  if (!token) {
    return res.json({ error: "User not loged in" });
  }
  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
