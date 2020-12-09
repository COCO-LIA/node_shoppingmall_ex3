const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../model/user')

//API 회원가입

router.post("/register", (req, res) => {

    const { username, email, password } = req.body;

//email 중복체크 - 패스워드 암호화 - 데이터베이스에 유저정보 저장

    userModel
        .findOne({email})
        .then(user => {
            if(user) {
                return res.json({
                    msg: "중복된 이메일입니다."
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.json({
                            error: err
                        })
                    } else {

                        const userInfo = new userModel ({
                            username,
                            email,
                            password: hash
                        })

                        userInfo
                            .save()
                            .then(user => {
                                res.json({
                                    msg: "회원가입 완료 ",
                                    userInfo: user
                                })
                            })
                            .catch(err => {
                                res.json({
                                    msg: err.message
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})


//로그인 API
router.post("/login", (req, res) => {

    //이메일 유무체크 => 패스워드 매칭 => 접속유저정보 뿌려주기(jwt 생성)
    userModel
        .findOne({email: req.body.emil })
        .then(user => {
            if(!user) {
                return res.json({
                    msg: "등록되지 않은 이메일입니다. 회원가입 먼저 "
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {

                    if(err || isMatch === false) {
                        return res.json({
                            msg: "Auth failed(password incorrected)"
                        })
                    } else {
                        // res.json(user)
                        //jwt 생성
                        const token = jwt.sign(
                            { id: user._id, email: user.email },
                            "five",
                            {expiresIn: "1d"}
                        )
                        res.json({
                            msg: "Auth successful",
                            tokenInfo: token
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                err: err.message
            })
        })

})

module.exports = router