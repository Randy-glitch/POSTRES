const express = require("express")
// const postres = require("./dbpostres/postres.json")


const app = express()

// MIDDLEWARE
app.use(express.json())
app.disable("x-powered-by")
// router import
const postresRouter = require("./routers/postres")
app.use('/postres', postresRouter)


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})