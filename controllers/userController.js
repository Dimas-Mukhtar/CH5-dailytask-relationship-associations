const { User, Auth, Shop } = require("../models")
const AppError = require("../utils/apiError")

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      // include: [
      //   {
      //     model: Auth,
      //     attributes: { exclude: ["createdAt", "updatedAt"] }
      //   }
      // ],
      include: ["Shop"]
    })
    res.status(200).json({
      status: "Success, fetched all users",
      data: {
        users
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const getUser = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findOne({
      where: { id },
      include: ["Auth"]
    })
    if (!user) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    res.status(200).json({
      status: `Success, user fetched where id ${id}`,
      data: {
        user
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const createUser = async (req, res, next) => {
  const { name, age, address, role } = req.body
  try {
    const newUser = await User.create({
      name,
      age,
      address,
      role
    })
    res.status(200).json({
      status: "Success, user created",
      data: {
        newUser
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const updateUser = async (req, res, next) => {
  const { name, age, address, role } = req.body
  const { id } = req.params
  try {
    const user = await User.findOne({ where: { id } })
    if (!user) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    const updateUser = await User.update(
      {
        name,
        age,
        address,
        role
      },
      { where: { id }, returning: true }
    )
    res.status(200).json({
      status: `Success, user updated where id ${id}`,
      data: {
        updateUser
      }
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findOne({ where: { id } })
    if (!user) {
      return next(new AppError(`Not found!, id with ${id} are not exist`, 404))
    }
    await User.destroy({ where: { id } })
    res.status(200).json({
      status: `Success, user deleted where id ${id}`,
      data: null
    })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
