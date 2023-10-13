const { Shop, User } = require("../models")
const AppError = require("../utils/apiError")
const getTokenFromHeaders = require("../middlewares/getTokenFromHeaders")
const decodedVerifyToken = require("../middlewares/decodedVerifyToken")

const createShop = async (req, res, next) => {
  const { name } = req.body
  try {
    const token = getTokenFromHeaders(req)
    const decodedUser = decodedVerifyToken(token)
    const userId = decodedUser.id
    const newShop = await Shop.create({
      name
    })
    await User.update(
      {
        shopId: newShop.id
      },
      { where: { id: userId } }
    )
    res.status(200).json({
      status: "Success, new shop created!, congrats youre now hava a shop",
      data: {
        newShop
      }
    })
  } catch (error) {
    console.error(error)
    next(new AppError(error.message, 500))
  }
}

const getShops = async (req, res, next) => {
  try {
    const shops = await Shop.findAll()
    res.status(200).json({
      status: "Success, shops fetched",
      data: {
        shops
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const getShop = async (req, res, next) => {
  const id = req.params.id
  try {
    const shop = await Shophop.findOne({ where: { id } })
    if (!shop) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    res.status(200).json({
      status: `Success, shop fetched where id ${id}`,
      data: {
        shop
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const updateShop = async (req, res, next) => {
  const { name } = req.body
  const id = req.params.id
  try {
    const findShop = await Shop.findOne({ where: { id } })
    if (!findShop) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    const shop = await Shop.update(
      {
        name: name
      },
      { where: { id }, returning: true }
    )
    res.status(200).json({
      status: `Success, shop updated where id ${id}`,
      data: {
        shop
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const deleteShop = async (req, res, next) => {
  const id = req.params.id
  try {
    const findShop = await Shop.findOne({ where: { id } })
    if (!findShop) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    const shop = await Shop.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json({
      status: `Success, shop deleted where id ${id}`,
      data: {
        shop
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

module.exports = {
  createShop,
  getShops,
  getShop,
  updateShop,
  deleteShop
}
