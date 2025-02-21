const express = require('express')
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const zod = require('zod')
const mongoose = require('mongoose')

const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({userId: req.userId})
    if(!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }
    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, to } = req.body

    const userAccount = await Account.findOne({userId: req.userId}).session(session)
    if (!userAccount) {
        await session.abortTransaction()
        return res.status(404).json({
            message: "Invalid user account"
        })
    } else if (userAccount.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const recieverAccount = await Account.findOne({userId:to}).session(session)

    if (!recieverAccount) {
        await session.abortTransaction()
        return res.status(404).json({
            message: 'Invalid reciever account'
        })
    }

    // Perform the transfer
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session)

    // Commit the transaction
    await session.commitTransaction()
    res.json({
        message: "Transfer successful"
    })
})

module.exports = router