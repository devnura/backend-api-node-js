const Router = require("express-promise-router");
const { body } = require("express-validator");

const productController = require("../controllers/product");
const auth = require("../controllers/auth");

const router = new Router();

router.get("/", auth.authenticateToken, productController.getProducts);

router.get("/:id", auth.authenticateToken, productController.getProduct);

router.post(
  "/",
  body("product_name").exists().isString().isLength({ max: 32 }),
  body("purchase_price").exists().not().isString().isLength({ max: 11 }),
  body("selling_price").exists().not().isString().isLength({ max: 11 }),
  body("stock").exists().isNumeric().isLength({ max: 11 }),
  auth.authenticateToken,
  productController.storeProduct
);

router.put(
  "/:id",
  body("product_name").exists().isString().isLength({ max: 32 }),
  body("purchase_price").exists().not().isString().isLength({ max: 11 }),
  body("selling_price").exists().not().isString().isLength({ max: 11 }),
  body("stock").exists().not().isString().isLength({ max: 11 }),
  auth.authenticateToken,
  productController.editProduct
);

router.delete("/:id", auth.authenticateToken, productController.deleteProduct);

module.exports = router;
