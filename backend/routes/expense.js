let express = require('express');

let router= express.Router()

let expenseController = require('../controller/expense')

const Userauth = require('../middleware/auth')

router.get('/user/getexpense', Userauth.authenticate , expenseController.getExpense)

router.post('/user/expense',Userauth.authenticate , expenseController.addExpense)

router.delete('/user/deleteExpense/:id',Userauth.authenticate,expenseController.deleteExpense)

module.exports = router