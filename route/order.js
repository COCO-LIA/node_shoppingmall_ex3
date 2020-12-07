
const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        msg: "order get"
    })
})

router.get("/:orderId", (req, res) => {
    res.json({
        msg: "오더 상세보기"
    })
})

router.post("/", (req, res) => {
    res.json({
        msg:"order post"
    })
})

router.patch("/", (req, res) => {
    res.json({
        msg:"order 수정 "
    })
})

router.delete("/", (req, res) => {
    res.json({
        msg: "all 삭제"
    })
})

router.delete("/:orderId",(req, res) => {
    res.json({
        msg: "delete one"
    })
})

module.exports = router