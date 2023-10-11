require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const PORT = process.env.PORT || 4000
const errorHandler = require("./controllers/errorController")
const AppError = require("./utils/apiError")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(morgan("dev"))

// routing api
app.use("/api/v1/products", require("./routes/productRouter"))
app.use("/dashboard", require("./routes/adminRouter"))
app.use("/api/v1/auth", require("./routes/authRouter"))

app.all("*", (req, res, next) => {
  // const err = new Error("Routes does not exist")
  // err.status = "Failed"
  // err.statusCode = 404
  return next(new AppError("Routes does not exist", 404))

  // next(err)
})

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server listening on localhost://localhost:${PORT}`)
})
