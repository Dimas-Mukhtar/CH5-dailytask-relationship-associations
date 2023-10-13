const { Product } = require("../models")
const imagekit = require("../lib/imageKit")

const createPage = async (req, res) => {
  res.render("create.ejs")
}

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body
  const file = req.file

  console.log(req.body)

  try {
    // dapatkan extension file nya
    const split = file.originalname.split(".")
    const extension = split[split.length - 1]

    // upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`
    })

    // IMG-10062023.jpeg

    await Product.create({
      name,
      price,
      stock,
      imageUrl: img.url
    })

    res.redirect("/dashboard/admin")
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message
    })
  }
}

const findProducts = async (req, res) => {
  try {
    const products = await Product.findAll()

    res.render("index.ejs", {
      products
    })
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message
    })
  }
}

module.exports = {
  createPage,
  createProduct,
  findProducts
}
