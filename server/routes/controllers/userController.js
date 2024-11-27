class UserController {
  async registration(request, response) {}
  async login(request, reponse) {}
  async check(request, response) {
    response.json("gashdsgh");
  }
}
module.exports = new UserController();
