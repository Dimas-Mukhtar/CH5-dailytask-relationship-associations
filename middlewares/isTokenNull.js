const getTokenFromHeaders = require("./getTokenFromHeaders")
const decodedVerifyToken = require("./decodedVerifyToken")
const ApiError = require("../utils/apiError")

const isTokenNull = (req, res, next) => {
  const token = getTokenFromHeaders(req)
  const decodedUser = decodedVerifyToken(token)
  if (decodedUser.id == null) {
    return next(new ApiError("Invalid token", 400))
  }
  next()
}

module.exports = isTokenNull
