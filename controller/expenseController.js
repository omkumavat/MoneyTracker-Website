const Expense = require("../models/expense")
const path = require('path');
const mongoose = require('mongoose');


exports.submitExpense = async (req, res) => {

    const { amount, date, purpose } = req.body;

    if (!amount || !purpose) {
        return res.status(400).json({ error: 'amount and purpose are required' });
    }

    try {
        // Save the post to the database
        const expense = new Expense({ amount, purpose, date });
        await expense.save();
        res.redirect('/expense');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating post' });
    }
};

let ExpenseTemp = []
exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find();
        const len = await Expense.countDocuments();
        const Expenss = []
        let target = 'Purpose';
        if (len == 0) {
            res.render('expense', { layout: false, target });
        }
        expenses.forEach(expense => {
            // Create a pair object with title and body
            const Expense = {
                amount: expense.amount,
                date: expense.date,
                purpose: expense.purpose,
                id: expense.id
            };
            // Push the pair object into the pairs array
            Expenss.push(Expense);
        });
        console.log(Expenss);
        ExpenseTemp = Expenss;

        res.render('expense', { layout: false, Expenss, target });
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.editExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        // Extract updated post data from request body
        const { amount, date, purpose } = req.body;

        // Validate input data
        if (!amount || !purpose) {
            return res.status(400).json({ error: 'Title and body are required' });
        }
        // console.log(req.body);

        // Find the post by ID and update it
        const updatetExpense = await Expense.findByIdAndUpdate(expenseId, { amount, date, purpose }, { new: true });
        console.log(updatetExpense);

        // Send the updated post as JSON response
        res.redirect('/expense');
    } catch (error) {
        console.error("Error editing post:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getEditExpense = async (req, res) => {
    const ID = req.params.id;
    const expense = await Expense.findById(ID);
    console.log(expense)
    const amount = expense.amount;
    const date = expense.date;
    const purpose = expense.purpose;
    let target = 'Purpose';

    res.render('expenseEdit', { layout: false, amount, date, purpose, ID, ExpenseTemp, target });
};

exports.deleteExpense = async (req, res) => {
    try {
        let expensId = req.params.id;
        console.log(expensId);
        if (!expensId) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }
        await Expense.findByIdAndDelete(expensId);
        res.redirect('/expense');
    } catch (error) {
        console.error("Error Deleting posts:", error);
        res.status(500).json("Error");
    }
}