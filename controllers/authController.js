const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Auth, User, Shop } = require("../models")
const ApiError = require("../utils/apiError")
const getTokenFromHeaders = require("../middlewares/getTokenFromHeaders")
const decodedVerifyToken = require("../middlewares/decodedVerifyToken")

const register = async (req, res, next) => {
  const { email, password, confirmPassword, name, age, address, role, shopId } = req.body
  try {
    if (!email || !password)
      return res.status(400).json({ status: "Bad request, email and password are required" })
    const user = await Auth.findOne({ where: { email } })
    if (user) {
      return next(new ApiError("User email already taken", 400))
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const hashConfirmPassword = await bcrypt.hash(password, salt)

    // minimum password length
    const passwordLength = password <= 8
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400))
    }

    if (password !== confirmPassword) {
      return next(new ApiError("Password and confirmPassword must be the same", 400))
    }

    let addShop
    if (shopId) {
      addShop = await Shop.findOne({ where: { id: shopId } })
    }

    const newUser = await User.create({
      name,
      address,
      age,
      role,
      shopId: addShop ? addShop.id : null
    })
    await Auth.create({
      email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      userId: newUser.id
    })

    res.status(201).json({
      status: "Success register",
      data: {
        ...newUser,
        email,
        password: hashPassword,
        confirmPassword: hashConfirmPassword
      }
    })
  } catch (error) {
    console.error(error)
    next(new ApiError(error.message, 500))
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await Auth.findOne({
      where: { email },
      include: ["User"]
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
          shopId: user.User.shopId
        },
        process.env.JWT_SECRET
      )

      res.status(200).json({
        status: "Success",
        message: "Success to login",
        data: {
          token
        }
      })
    } else {
      return next(new ApiError("wrong credentials", 400))
    }
  } catch (error) {
    next(new ApiError(error.message, 500))
  }
}

const checkToken = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req)
    const decodedUser = decodedVerifyToken(token)
    const userId = decodedUser.id
    const user = await User.findOne({
      where: { id: userId }
    })
    res.status(200).json({
      status: "Success",
      data: {
        user
      }
    })
  } catch (error) {
    next(new ApiError(error.message, 500))
  }
}

module.exports = {
  register,
  login,
  checkToken
}
