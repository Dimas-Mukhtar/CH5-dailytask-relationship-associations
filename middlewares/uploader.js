const multer = require("multer")
const AppError = require("../utils/apiError")

const multerFiltering = (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true)
    } else {
        return cb(new AppError("hanya format image saja", 400))
    }
}

const upload = multer({
    fileFilter: multerFiltering
})
module.exports = upload
