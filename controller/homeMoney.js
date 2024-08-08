const Expense = require("../models/expense")
const Income = require("../models/income")
const path = require('path');
const mongoose = require('mongoose');

exports.getTotal = async (req, res) => {
    try {
        let totalInc = 0;
        const incomes = await Income.find();
        const leni = await Income.countDocuments();

        if (leni != 0) {
            incomes.forEach(income => {
                const IncomeItem = {
                    amount: income.amount,
                };
                totalInc += IncomeItem.amount;
            });
        }

        let totalExp = 0, maxExpense = 0, minExpense = 10000000000000000;
        const expenses = await Expense.find();
        const len = await Expense.countDocuments();
        if (len != 0) {
            expenses.forEach(expense => {
                const ExpenseItem = {
                    amount: expense.amount,
                };
                if (ExpenseItem.amount > maxExpense) {
                    maxExpense = ExpenseItem.amount;
                }
                if (ExpenseItem.amount < minExpense) {
                    minExpense = ExpenseItem.amount;
                }
                totalExp += ExpenseItem.amount;
            });
        }
        else {
            minExpense = 0;;
        }

        console.log("Total Income:", totalExp);
        let totalBalance = totalInc - totalExp;

        res.render('index', { totalInc, totalExp, totalBalance, maxExpense, minExpense }); // Render income list
    } catch (err) {
        console.error("Error fetching incomes:", err);
        res.status(500).send("Internal Server Error");
    }
};
