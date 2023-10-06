const router = require("express").Router()
const Admin = require("../controllers/adminController")

const uploader = require("../middlewares/uploader")

router.route("/admin").get(Admin.findProducts)
router.route("/admin/create").get(Admin.createPage)
router.route("/admin/create-action").post(uploader.single("image"), Admin.createProduct)
module.exports = router
