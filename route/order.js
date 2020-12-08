
const express = require('express')
const router = express.Router()

const orderModel = require('../model/order')

router.get("/", (req, res) => {
    // res.json({
    //     msg: "order get"
    // })
    orderModel
        .find()
        .then( docs => {
            res.json({
                msg: "order total get",
                count: docs.length,
                orders: docs.map(doc => {
                    return{
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: "http:/localhost:3001/order/" + doc._id
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

router.get("/:orderId", (req, res) => {
    // res.json({
    //     msg: "오더 상세보기"
    // })
    orderModel
        .findById(req.params.orderId)
        .populate("product", ["name", "price"])
        .then(item => {
            res.json({
                msg: "order data" + item._id,
                orderInfo: {
                    id: item._id,
                    product: item.product,
                    quantity: item.quantity,
                    request: {
                        type: 'GET',
                        url: "http://localhost:4001/order"
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
    // res.json({
    //     msg:"order post"
    // })

    const orderInfo = new orderModel({
        product: req.body.pd,
        quantity: req.body.qty
    })

    orderInfo
        .save()
        .then(item => {
            res.json({
                msg: "장바구니 담기",
                orderInfo: item
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.patch("/:pd", (req, res) => {
    // res.json({
    //     msg:"order 수정 "
    // })

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .findByIdAndUpdate(req.params.pd, {$set:updateOps})
        .then( item => {
            res.json({
                msg: "patch" + req.params.pd,
                request : {
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
    //     msg: "all 삭제"
    // })
    orderModel
        .deleteMany()
        .then(() => {
            res.json({
                msg: "delete one",
                request: {
                    type: "GET",
                    url: "http://localhost:3001/order"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.delete("/:orderId",(req, res) => {
    res.json({
        msg: "delete one"
    })
})

module.exports = router