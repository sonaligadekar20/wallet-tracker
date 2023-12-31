import { responder } from "./../util.js";
import Transaction from '../models/Transaction.js'

const postApiTransaction = async (req, res) => {
    const { user, amount, type, category, description } = req.body;

    const transaction = new Transaction({
        user,
        amount,
        type,
        category,
        description
    });

    try {
        const savedTransaction = await transaction.save();

        return responder({ res, success: true, message: 'Transaction saved', data: savedTransaction });

    } catch (err) {
        return responder({
            res,
            success: false,
            message: err.message
        });
    }
}

const getApiTransaction = async (req, res) => {
    const allTransactions = await Transaction.find();

    return responder({
        res, success: true,
        message: 'Successfully fetched all transactions',
        data: allTransactions
    })
}

const getApiTransactionById = async (req, res) => {
    const { id } = req.params;
    try {

        const transactionById = await Transaction.findOne({ _id: id });
        return responder({
            res,
            success: true,
            data: transactionById,
            message: 'Transaction get successfully.'
        })
    }
    catch (err) {
        return responder({
            res,
            success: false,
            message: 'Transaction not featch.'
        })
    }
}

const getApiTransactionUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const transactionUserById = await Transaction.find({ user: id });
        +
            // transactionUserById.forEach((singleTransaction) => {
            //   singleTransaction.user.password = undefined;
            // });
            res.json({
                success: true,
                data: transactionUserById,
                message: "user fetch transaction successfully...",
            });
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
};

const putApiTransaction = async (req, res) => {
    const { id } = req.params;

    const { amount, type, category, description } = req.body;

    await Transaction.updateOne({ _id: id },
        {
            $set: {
                amount: amount,
                type: type,
                category: category,
                description: description,
            }
        });

    const updatedTransaction = await Transaction.findById(id);
    return responder({
        res,
        success: true,
        data: updatedTransaction,
        message: "Transaction updated successfully."
    });
}

const deleteApiTransaction = async (req, res) => {
    const { id } = req.params;

    await Transaction.deleteOne({ _id: id })
    res.json({
        success: true,
        data: {
            id: id
        },
        message: 'Transaction deleted successfully.'
    })
}

export { postApiTransaction, getApiTransaction, getApiTransactionById, getApiTransactionUserById, putApiTransaction, deleteApiTransaction }