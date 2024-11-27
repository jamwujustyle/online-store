const jwt = require("jsonwebtoken");
module.exports = function (role) {
  return function (request, response, next) {
    if (request.method == "OPTIONS") {
      next();
    }
    try {
      const token = request.headers.authorization?.split(" ")[1]; // Bearer fasgdfafasfa;
      if (!token) {
        return response.status(401).json({ message: "not authorized" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return response.status(403).json({ message: "access denied" });
      }
      request.user = decoded;
      next();
    } catch (error) {
      response.status(401).json({ message: "could not authorize" });
    }
  };
};
