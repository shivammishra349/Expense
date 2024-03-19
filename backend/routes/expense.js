let express = require('express');

let router= express.Router()

let expenseController = require('../controller/expense')

const Userauth = require('../middleware/auth')

router.get('/getexpense', Userauth.authenticate , expenseController.getExpense)

router.post('/addexpense',Userauth.authenticate , expenseController.addExpense)

router.delete('/deleteExpense/:id',Userauth.authenticate,expenseController.deleteExpense)

module.exports = router