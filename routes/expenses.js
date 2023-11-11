const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

// get all users
router.get('/get-expenses', expenseController.getExpenses);
router.post('/add-expense', expenseController.postExpense);
router.put('/edit-expense/:expId', expenseController.postEditExpense);
router.delete('/delete-expense/:expId', expenseController.postDeleteExpense);

module.exports = router;
