const router = require("express").Router()
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController")

const uploader = require("../middlewares/uploader")

router.route("/").post(uploader.single("image"), createProduct).get(getProducts)
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router
