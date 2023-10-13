const imagekit = require("../lib/imageKit")
const { Product } = require("../models")
const AppError = require("../utils/apiError")
const getTokenFromHeaders = require("../middlewares/getTokenFromHeaders")
const decodedVerifyToken = require("../middlewares/decodedVerifyToken")

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body
  // const file = req.file
  // let img

  try {
    // if (file) {
    //   // dapatkan extension file nya
    //   const split = file.originalname.split(".")
    //   const extension = split[split.length - 1]

    //   // upload file ke imagekit
    //   const uploadedImage = await imagekit.upload({
    //     file: file.buffer,
    //     fileName: `IMG-${Date.now()}.${extension}`
    //   })
    //   img = uploadedImage.url
    // }
    const token = getTokenFromHeaders(req)
    const decodedUser = decodedVerifyToken(token)
    const userId = decodedUser.id
    const shopId = decodedUser.shopId
    if (userId === null) {
      return next(new AppError("Invalid token", 404))
    }
    if (shopId === null) {
      return next(new AppError("You dont have relation to any shop", 400))
    }

    const newProduct = await Product.create({
      name,
      price,
      stock,
      shopId: shopId
    })

    res.status(200).json({
      status: "Success, product created",
      data: {
        newProduct
      }
    })
  } catch (error) {
    console.error(error)
    next(new AppError(error.message, 500))
  }
}

const getProducts = async (req, res, next) => {
  try {
    const product = await Product.findAll({ include: ["Shop"] })
    res.status(200).json({
      status: "Success, product fetched",
      data: {
        product
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const getProduct = async (req, res, next) => {
  const id = req.params.id
  try {
    const product = await Product.findOne({ where: { id }, include: ["Shop"] })
    if (!product) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    res.status(200).json({
      status: `Success, product fetched where id ${id}`,
      data: {
        product
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const updateProduct = async (req, res, next) => {
  const { name, price, stock } = req.body
  const id = req.params.id
  try {
    const findProduct = await Product.findOne({ where: { id } })
    if (!findProduct) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    const product = await Product.update(
      {
        name: name,
        price: price,
        stock: stock
      },
      { where: { id }, returning: true }
    )
    res.status(200).json({
      status: `Success, product updated where id ${id}`,
      data: {
        product
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const deleteProduct = async (req, res, next) => {
  const id = req.params.id
  try {
    const findProduct = await Product.findOne({ where: { id } })
    if (!findProduct) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    const product = await Product.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json({
      status: `Success, product deleted where id ${id}`,
      data: {
        product
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}
