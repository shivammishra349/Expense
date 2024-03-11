let express = require('express');

let router= express.Router()

let expenseController = require('../controller/expense')

router.get('/user/getexpense',expenseController.getExpense)

router.post('/user/expense', expenseController.addExpense)

router.delete('/user/deleteExpense/:id',expenseController.deleteExpense)

module.exports = router