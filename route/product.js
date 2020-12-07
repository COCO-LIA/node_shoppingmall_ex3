//1
const express = require('express')
const router = express.Router()

const productModel = require('../model/product')

router.get("/", (req, res) => {
    res.json({
        message: "product get"
    })
})

router.get("/pd", (req, res) =>{
    res.json({
        msg: "상세보기 get"
    })
})

router.post("/", (req, res) => {

    // const productInfo = {
    //     name: req.body.pn,
    //     price: req.body.pp,
    //     category: req.body.ct
    // }
    const { name, price, category } = req.body;

    const productInfo = new productModel({
        name,
        price,
        category
    })

    productInfo
        .save()
        .then(item => {
            res.json({
                msg: "save product",
                productInfo: item
            })
        })
        .catch(err => {
            res.json({
                mesg: err.message
            })
        })

    // res.json({
    //     msg: "post ",
    //     product: productInfo
    // })
})

router.patch("/", (req, res) =>{
    res.json({
        msg: "patct"
    })
})

router.delete("/:pd", (req, res) => {
    res.json({
        msg: "delete one"
    })
})

router.delete("/", (req, res) => {
    res.json({
        msg: "delete all "
    })
})

//2
module.exports = router