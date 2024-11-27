const { Type } = require("../models/models");
class TypeController {
  async create(request, response) {
    const { name } = request.body;
    const type = await Type.create({ name });
    return response.json(type);
  }
  async getAll(request, reponse) {}
}
module.exports = new TypeController();
