const router = require("express").Router()
const shopController = require("../controllers/shopController")
const checkOwnerShip = require("../middlewares/checkOwnership")
const checkTokenFromHeaders = require("../middlewares/checkTokenFromHeaders")
const isTokenNull = require("../middlewares/isTokenNull")

router
  .route("/")
  .post(checkTokenFromHeaders, isTokenNull, checkOwnerShip, shopController.createShop)
  .get(shopController.getShops)

router
  .route("/:id")
  .put(checkTokenFromHeaders, isTokenNull, checkOwnerShip, shopController.updateShop)
  .get(shopController.getShop)
  .delete(checkTokenFromHeaders, isTokenNull, checkOwnerShip, shopController.deleteShop)

module.exports = router
