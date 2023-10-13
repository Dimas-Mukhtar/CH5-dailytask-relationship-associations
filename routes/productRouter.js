const router = require("express").Router()
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController")

const uploader = require("../middlewares/uploader")
const checkTokenFromHeaders = require("../middlewares/checkTokenFromHeaders")
const checkOwnerShip = require("../middlewares/checkOwnership")
const isTokenNull = require("../middlewares/isTokenNull")

router
  .route("/")
  .post(checkTokenFromHeaders, isTokenNull, uploader.single("image"), createProduct)
  .get(getProducts)
router
  .route("/:id")
  .get(getProduct)
  .put(checkTokenFromHeaders, checkOwnerShip, updateProduct)
  .delete(checkTokenFromHeaders, checkOwnerShip, deleteProduct)

module.exports = router
