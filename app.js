require('dotenv').config({path: "./.env"});
const express = require("express")
const postresRouter = require("./routers/postres")
const authRouter = require("./routers/auth")
const cookieParser = require('cookie-parser');

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cookieParser());
app.disable("x-powered-by")

// router import
app.use('/postres', postresRouter)
app.use('/auth', authRouter)


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})