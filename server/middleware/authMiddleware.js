const jwt = require("jsonwebtoken");
module.exports = function (request, response, next) {
  if (request.method == "OPTIONS") {
    next();
  }
  try {
    const token = request.headers.authorization?.split(" ")[1]; // Bearer fasgdfafasfa;
    if (!token) {
      return response.status(401).json({ message: "not authorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    request.user = decoded;
    next();
  } catch (error) {
    response.status(401).json({ message: "could not authorize" });
  }
};
