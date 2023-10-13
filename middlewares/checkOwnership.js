const getTokenFromHeaders = require("./getTokenFromHeaders")
const decodedVerifyToken = require("./decodedVerifyToken")
const ApiError = require("../utils/apiError")

const checkOwnerShip = (req, res, next) => {
  const token = getTokenFromHeaders(req)
  const decodedUser = decodedVerifyToken(token)
  if (decodedUser.role != "Owner") {
    return next(new ApiError("Forbidden, staff do not have access to this!", 403))
  }
  next()
}

module.exports = checkOwnerShip
