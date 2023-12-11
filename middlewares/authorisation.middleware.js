const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  isAuthorised: async (req, res, next) => {
    try {
      let token = req.headers.Authorization || req.headers.authorization;
      if (token) {
        token = token.substr("Bearer ".length);
        const decoded = await jwt.verify(token, config.jwtSecret);
        if (!decoded) {
          return res.status(401).json("unauthorised not decoded");
        }
        req.decoded = decoded;
        return next();
      }
      return res.status(401).json("unauthorised no token");
    } catch (error) {
      console.log("\n isAuthorised error...", error);
      return res.status(401).json("unauthorised");
    }
  },
};
