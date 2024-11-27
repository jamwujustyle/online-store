const uuid = require("uuid");
const path = require("path");
const apiError = require("../error/apiError");
const { Device, DeviceInfo } = require("../models/models");
const { response } = require("../routes");
class DeviceController {
  async create(request, response, next) {
    try {
      const {
        body: { name, price, brandId, typeId, info },
      } = request;
      const { img } = request.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      return response.json(device);
    } catch (err) {
      next(apiError.badRequest(err.message));
    }
  }
  async getAll(request, response) {
    let {
      query: { brandId, typeId, limit, page },
    } = request;

    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return response.json(devices);
  }
  async getOne(request, response) {
    const {
      params: { id },
    } = request;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return response.json(device);
  }
}
module.exports = new DeviceController();
