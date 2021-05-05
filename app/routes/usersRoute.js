const Router = require("express-promise-router");
const { body } = require("express-validator");

const userController = require("../controllers/user");
const auth = require("../controllers/auth");

const router = new Router();

router.get("/", auth.authenticateToken, userController.getUsers);

router.get("/:id", auth.authenticateToken, userController.getUser);

router.post(
  "/",
  body("username").exists().isString().isLength({ min: 8,max: 16 }),
  body("name").exists().isString().isLength({ max: 32 }),
  body("password").exists().isString().isLength({ min: 8, max: 32 }),
  body("role").exists().isString().isNumeric().isLength({ max: 1 }),
  auth.authenticateToken,
  userController.storeUser
);

router.put(
  "/:id",
  body("username").exists().isString().isLength({ min: 8,max: 16 }),
  body("name").exists().isString().isLength({ max: 32 }),
  body("password").exists().isString().isLength({ min: 8, max: 32 }),
  body("role").exists().isString().isNumeric().isLength({ max: 1 }),
  auth.authenticateToken,
  userController.editUser
);

router.delete("/:id",  userController.deleteUser);

module.exports = router;
