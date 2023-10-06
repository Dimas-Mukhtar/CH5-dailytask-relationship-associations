const imagekit = require("../lib/imageKit")
const { Product } = require("../models")

const createProduct = async (req, res) => {
    const { name, price, stock } = req.body
    const file = req.file
    // dapatkan extension filenya
    const split = file.originalname.split(".")
    const extension = split(split.length - 1)

    // upload file ke image kit
    const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`
    })
    try {
        const product = await Product.create({
            name,
            price,
            stock,
            ImageUrl: img.url
        })
        res.status(200).json({
            status: "Success, product created",
            data: {
                product
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const product = await Product.findAll()
        res.status(200).json({
            status: "Success, product fetched",
            data: {
                product
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const getProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({ where: { id } })
        if (!product) {
            return res.status(404).json({
                status: `Not found!, id with ${id} are not exist`
            })
        }
        res.status(200).json({
            status: `Success, product fetched where id ${id}`,
            data: {
                product
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    const { name, price, stock } = req.body
    const id = req.params.id
    try {
        const findProduct = await Product.findOne({ where: { id } })
        if (!findProduct) {
            return res.status(404).json({
                status: `Not found!, id with ${id} are not exist`
            })
        }
        const product = await Product.update(
            {
                name: name,
                price: price,
                stock: stock
            },
            { where: { id } }
        )
        res.status(200).json({
            status: `Success, product updated where id ${id}`,
            data: {
                product
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const findProduct = await Product.findOne({ where: { id } })
        if (!findProduct) {
            return res.status(404).json({
                status: `Not found!, id with ${id} are not exist`
            })
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
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
