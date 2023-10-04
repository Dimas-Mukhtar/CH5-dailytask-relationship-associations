const { Product } = require("../models/index")

const createProduct = async (req, res) => {
    const { name, price, stock } = req.body
    try {
        const newProduct = await Product.create({
            name: name,
            price: price,
            stock: stock
        })
        res.status(200).json({
            status: "Success, P created",
            data: {
                newProduct
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
        const product = await Product.findAll({})
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
    try {
        const product = await Product.update({
            name: name,
            price: price,
            stock: stock
        })
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

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.destroy({
            where: { id: req.params.id }
        })
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

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
