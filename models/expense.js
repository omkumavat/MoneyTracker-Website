// Import Mongoose 
const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')


// Route Handler 
const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})


// Export 
module.exports = mongoose.model("expense", expenseSchema)