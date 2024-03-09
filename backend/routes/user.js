let express=require('express')

let router=express.Router();

let Controller = require('../controller/user')

router.post('/user/signup',Controller.postData)

module.exports = router