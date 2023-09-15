const express = require("express")
const database = require("./database/sqlite")
const router = require("./routes")

database()

const app = express()
app.use(express.json())
app.use(router)

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))