const ApiError = require("../utils/apiError")
module.exports = (role) => {
  return async function (req, res, next) {
    try {
      if (req.user.role != role) {
        next(new ApiError(`Kamu bukan ${role} jdi tiak bisa akses`, 401))
      }
      next()
    } catch (error) {
      next(new ApiError(error.message, 500))
    }
  }
}
