const express = require("express")
const morgan = require("morgan")
const PORT = process.env.PORT || 4000

const router = require("./routes/productRouter")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))

// routing api
app.use("/api/v1/products", router)

app.listen(PORT, () => {
    console.log(`Server listening on localhost://localhost:${PORT}`)
})
