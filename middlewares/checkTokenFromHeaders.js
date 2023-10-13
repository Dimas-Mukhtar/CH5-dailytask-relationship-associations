const jwt = require("jsonwebtoken")

const { User, Auth } = require("../models")
const ApiError = require("../utils/apiError")

module.exports = async function (req, res, next) {
  try {
    const bearerToken = req.headers.authorization

    if (!bearerToken) {
      next(new ApiError("no token", 401))
    }
    next()
  } catch (error) {
    next(new ApiError(error.message, 500))
  }
}
