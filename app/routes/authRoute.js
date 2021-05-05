const Router = require("express-promise-router");
const controller = require("../controllers/auth");

const router = new Router();

router.post("/", controller.authUser);

module.exports = router;
