const ApiError = require("../error/apiError");
class UserController {
  async registration(request, response) {}
  async login(request, reponse) {}
  async check(request, response, next) {
    const { id } = request.query;
    if (!id) {
      return next(ApiError.badRequest("id not specified"));
    }
    response.json(id);
  }
}
module.exports = new UserController();
