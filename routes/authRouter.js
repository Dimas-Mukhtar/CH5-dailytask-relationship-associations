const router = require("express").Router()
const authController = require("../controllers/authController")
const checkTokenFromHeaders = require("../middlewares/checkTokenFromHeaders")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/user", checkTokenFromHeaders, authController.checkToken)

module.exports = router
