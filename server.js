const express = require("express")
const morgan = require("morgan")
const PORT = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(morgan("dev"))

// routing api
app.use("/api/v1/products", require("./routes/productRouter"))
app.use("/dashboard", require("./routes/adminRouter"))

app.listen(PORT, () => {
    console.log(`Server listening on localhost://localhost:${PORT}`)
})
