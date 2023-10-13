const router = require("express").Router()
const shopController = require("../controllers/shopController")
const checkOwnerShip = require("../middlewares/checkOwnership")
const checkTokenFromHeaders = require("../middlewares/checkTokenFromHeaders")

router
  .route("/")
  .post(checkTokenFromHeaders, checkOwnerShip, shopController.createShop)
  .get(shopController.getShops)

router
  .route("/:id")
  .put(checkTokenFromHeaders, checkOwnerShip, shopController.updateShop)
  .get(shopController.getShop)
  .delete(checkTokenFromHeaders, checkOwnerShip, shopController.deleteShop)

module.exports = router
