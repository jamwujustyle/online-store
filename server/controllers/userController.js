const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async registration(request, response, next) {
    const {
      body: { email, password, role },
    } = request;
    if (!email && !password) {
      return next(ApiError.badRequest("incorrect password or email"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("user with this email exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashedPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return response.json(token);
  }

  async login(request, response, next) {
    const {
      body: { email, password },
    } = request;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("couldn't find user"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("incorrect password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return response.json(token);
  }
  async check(request, response, next) {
    const token = generateJwt(
      request.user.id,
      request.user.email,
      request.user.role
    );
    return response.json({ token });
  }
}
module.exports = new UserController();
