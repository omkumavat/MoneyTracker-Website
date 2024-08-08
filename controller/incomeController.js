const Income = require("../models/income");

exports.submitIncome = async (req, res) => {
    const { amount, date, purpose } = req.body;

    if (!amount || !purpose || !date) {
        return res.status(400).json({ error: 'amount, purpose, and date are required' });
    }

    try {
        const income = new Income({ amount, purpose, date });
        await income.save();
        res.redirect('/income');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating income' });
    }
};

let incomeTemp = []
exports.getIncome = async (req, res) => {
    try {
        const incomes = await Income.find();
        const len = incomes.length;
        const Incomess = [];
        let target = 'Source';
        if (len === 0) {
            return res.render('income', { layout: false, target }); // Render empty income list
        }

        incomes.forEach(income => {
            const IncomeItem = {
                amount: income.amount,
                date: income.date,
                purpose: income.purpose,
                id: income.id
            };
            // Accumulate total income amount
            Incomess.push(IncomeItem);
        });
        incomeTemp = Incomess;

        res.render('income', { layout: false, Incomess, target }); // Render income list
    } catch (err) {
        console.error("Error fetching incomes:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.editIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        // Extract updated post data from request body
        const { amount, date, purpose } = req.body;

        // Validate input data
        if (!amount || !purpose) {
            return res.status(400).json({ error: 'Title and body are required' });
        }
        // console.log(req.body);

        // Find the post by ID and update it
        const updatedIncome = await Income.findByIdAndUpdate(incomeId, { amount, date, purpose }, { new: true });
        console.log(updatedIncome);

        // Send the updated post as JSON response
        res.redirect('/income');
    } catch (error) {
        console.error("Error editing post:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getEditIncome = async (req, res) => {
    const ID = req.params.id;
    const income = await Income.findById(ID);
    console.log(income)
    const amount = income.amount;
    const date = income.date;
    const purpose = income.purpose;
    let target = 'Source';

    res.render('incomeEdit', { layout: false, amount, date, purpose, ID, incomeTemp, target });
};

exports.deleteIncome = async (req, res) => {
    try {
        let incomeId = req.params.id;
        console.log(incomeId);
        if (!incomeId) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }
        await Income.findByIdAndDelete(incomeId);
        res.redirect('/income');
    } catch (error) {
        console.error("Error Deleting posts:", error);
        res.status(500).json("Error");
    }
}
