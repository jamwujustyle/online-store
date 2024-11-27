const Router = require("express");
const router = Router();
const userController = require("./controllers/userController");

router.post("/registration");
router.post("/login");
router.get("/auth", userController.check);

module.exports = router;
