const mongoose = require('mongoose')

/*
    @desc Get all todo headers
    @route GET /api/headers
    @access Private
*/

const ToDoHeadersModel = require('../models/todoHeaderModel')
const todoHeaderModel = require('../models/todoHeaderModel')

const getHeaders = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    const todoHeadersList = await ToDoHeadersModel.find()
    res.status(200).json(todoHeadersList)
}

const postHeaders = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    const {title, pinned} = req.body
    if (!title) {
        res.status(400).send('Please add a text field')
    }

    if (!pinned) {
        res.status(400).send('Please add wether header is pinned or not')
    }

    const result = await todoHeaderModel.create({
        _id: new mongoose.Types.ObjectId(),
        title, pinned
    })
    
    res.status(200).json(result)
}

module.exports = {
    getHeaders,
    postHeaders
}