let express=require('express')

let router=express.Router();

let Controller = require('../controller/user')

router.post('/user/signup',Controller.postSignup)

router.post('/user/login',Controller.postLogin)

module.exports = router