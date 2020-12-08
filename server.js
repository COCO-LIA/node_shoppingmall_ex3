const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
//test
// app.use((req, res) => {
//     res.json({
//         msg: "서버시작 "
//     })
// })

//DB 커넥트
const dbAddress = "mongodb+srv://admin:qwer@cluster0.huxry.mongodb.net/shoppingmall?retryWrites=true&w=majority"

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose
    .connect(dbAddress, dbOptions)
    .then(() => console.log(" DB도 연결됐당 "))
    .catch(err => console.log("+++++++++++++++++++++++", err.message))

const productRoute = require('./route/product')
const orderRoute = require('./route/order')


//미들웨어 설정
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.use("/product", productRoute)
app.use("/order", orderRoute)

const port = 3001

app.listen(port, console.log(" 서버 시작됐당 "))