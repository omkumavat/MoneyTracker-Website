const Income = require("../models/income")
const Expense = require("../models/expense")
const path = require('path');
const mongoose = require('mongoose');

exports.getTransaction = async (req, res) => {
    try {
        const incomes = await Income.find();
        const len = await Income.countDocuments();
        const Incomess = []
        if (len != 0) {
            incomes.forEach(income => {
                // Create a pair object with title and body
                const Incomes = {
                    amount: income.amount,
                    date: income.date,
                    purpose: income.purpose
                };
                // Push the pair object into the pairs array
                Incomess.push(Incomes);
            });
            console.log(Incomess);
        }

        const expenses = await Expense.find();
        const len2 = await Expense.countDocuments();
        const Expenss = []
        if (len2 != 0) {
            expenses.forEach(expense => {
                // Create a pair object with title and body
                const Expense = {
                    amount: expense.amount,
                    date: expense.date,
                    purpose: expense.purpose
                };
                // Push the pair object into the pairs array
                Expenss.push(Expense);
            });
            console.log(Expenss);
        }

        res.render('transaction', { layout: false, Incomess, Expenss });
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).send("Internal Server Error");
    }
}