const router = require("express").Router()
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController")

const uploader = require("../middlewares/uploader")
const authenticate = require("../middlewares/authentication")
const checkRole = require("../middlewares/checkRole")

router
  .route("/")
  .post(uploader.single("image"), createProduct)
  .get(authenticate, checkRole("Owner"), getProducts)
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router
