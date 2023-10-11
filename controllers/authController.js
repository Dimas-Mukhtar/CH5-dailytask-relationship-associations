const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Auth, User } = require("../models")
const ApiError = require("../utils/apiError")

const register = async (req, res, next) => {
  const { email, password, confirmPassword, name, age, address } = req.body
  try {
    // validasi untuk check apakah emailnya udah ada atau belum
    const user = await Auth.findOne({ where: { email } })
    if (user) {
      next(new ApiError("User email already taken", 400))
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const hashConfirmPassword = await bcrypt.hash(password, salt)

    // minimum password length
    const passwordLength = password <= 8
    if (passwordLength) {
      next(new ApiError("Minimum password must be 8 character", 400))
    }

    if (password !== confirmPassword) {
      next(new ApiError("Minimum confirm password does not same", 400))
    }

    const newUser = await User.create({
      name,
      address,
      age
    })
    await Auth.create({
      email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      userId: newUser.id
    })

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser,
        email,
        password: hashPassword,
        confirmPassword: hashConfirmPassword
      }
    })
  } catch (error) {
    next(new ApiError(error.message, 400))
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
          email: user.email
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

module.exports = {
  register,
  login
}
