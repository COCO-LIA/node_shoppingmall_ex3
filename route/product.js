//1
const express = require('express')
const router = express.Router()

const productModel = require('../model/product')

router.get("/", (req, res) => {
    // res.json({
    //     message: "product get"
    // })

    productModel
        .find()
        .then(docs => {
            res.json({
                msg: "pd tt get",
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        category: doc.category,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3001/product/" + doc.id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.get("/:pd", (req, res) =>{
    // res.json({
    //     msg: "상세보기 get"
    // })
    productModel
        .findById(req.params.pd)
        .then(item => {
            res.json({
                msg: item._id,
                product: {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3001/product"
                    }

                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
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
                productInfo: {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3001/product/" + item._id
                    }
                }
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

router.patch("/:pd", (req, res) =>{
    // res.json({
    //     msg: "patct"
    // })

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    productModel
        .findByIdAndUpdate(req.params.pd, { $set: updateOps})
        .then(item=> {
            res.json({
                msg: " 수정완료 " + req.params.pd,
                request: {
                    type: 'GET',
                    url: "http://localhost:3001/product/" + req.params.pd
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.delete("/", (req, res) => {
    // res.json({
    //     msg: "delete "
    // })
    productModel
        .deleteMany()
        .then(() => {
            res.json({
                msg: "delete all",
                request: {
                    type: 'GET',
                    url: "http://localhost:3001/product"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.delete("/:pd", (req, res) => {
    // res.json({
    //     msg: "delete one "
    // })
    productModel
        .findByIdAndDelete(req.params.pd)
        .then(()=> {
            res.json({
                msg: "delete one",
                request: {
                    type: 'GET',
                    url: "http://localhost:3001/product"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

//2
module.exports = router