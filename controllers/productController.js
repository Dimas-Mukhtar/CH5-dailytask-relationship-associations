const imagekit = require("../lib/imageKit")
const { Product } = require("../models")
const AppError = require("../utils/apiError")

const createProduct = async (req, res, next) => {
    const { name, price, stock } = req.body
    const file = req.file
    let img
    try {
        if (file) {
            // dapatkan extension filenya
            const split = file.originalname.split(".")
            const extension = split(split.length - 1)

            // upload file ke image kit
            const img = await imagekit.upload({
                file: file.buffer,
                fileName: `IMG-${Date.now()}.${extension}`
            })
            img = img.url
        }
        const product = await Product.create({
            name,
            price,
            stock,
            ImageUrl: img
        })
        res.status(200).json({
            status: "Success, product created",
            data: {
                product
            }
        })
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}

const getProducts = async (req, res, next) => {
    try {
        const product = await Product.findAll()
        res.status(200).json({
            status: "Success, product fetched",
            data: {
                product
            }
        })
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}

const getProduct = async (req, res, next) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({ where: { id } })
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
        next(new AppError(error.message, 400))
    }
}

const updateProduct = async (req, res, next) => {
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
        next(new AppError(error.message, 400))
    }
}

const deleteProduct = async (req, res, next) => {
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
        next(new AppError(error.message, 400))
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
