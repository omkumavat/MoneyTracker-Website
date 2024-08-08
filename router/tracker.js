const express = require('express');
const Expense = require("../models/expense")
const router = express.Router();
const Post = require('../models/income');
const mongoose = require('mongoose');

const { totalInc, getIncome, submitIncome, getEditIncome, editIncome, deleteIncome } = require('../controller/incomeController');
router.post('/incomeSubmit', submitIncome);
router.get('/income', getIncome);
router.get('/income/:id', getEditIncome);
router.put('/editIncome/:id', editIncome);
router.delete('/deleteIncome/:id', deleteIncome);

const { getTotal } = require('../controller/homeMoney');
router.get('/', getTotal);

const { getExpense, submitExpense, editExpense, getEditExpense, deleteExpense } = require('../controller/expenseController');
router.post('/submitExpense', submitExpense);
router.get('/expense', getExpense);
router.get("/expense/:id", getEditExpense);
router.put('/editExpense/:id', editExpense);
router.delete("/deleteExpense/:id", deleteExpense);

const { getTransaction } = require('../controller/transactionController');
router.get('/transaction', getTransaction);

module.exports = router;