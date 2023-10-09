class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4" ? "Failed" : "Error")
        Error.captureStackTrace(this, this.constructor)
    }
}

// const getAppError = (message, statusCode) => {
//     return new AppError(message, statusCode)
// }

// module.exports = {
//     AppError,
//     getAppError
// }

module.exports = AppError
