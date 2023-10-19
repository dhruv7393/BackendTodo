const mongoose = require('mongoose')

/*
    @desc Get all todo headers
    @route GET /api/headers
    @access Private
*/

const ToDoHeadersModel = require('../models/todoHeaderModel')
const ToDoModel = require('../models/todoModel')

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

    const result = await ToDoHeadersModel.create({
        _id: new mongoose.Types.ObjectId(),
        title, pinned
    })
    
    res.status(200).json(result)
}

const getHeadersById = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    const {id} = req.params
    const todoHeadersList = await ToDoHeadersModel.findById(id)
    res.status(200).json(todoHeadersList)
}

const updateHeadersById = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    const {id} = req.params
    const todoHeadersList = await ToDoHeadersModel.findByIdAndUpdate(id, req.body)
    res.status(200).json(todoHeadersList)
}

const deleteHeadersById = async(req, res) =>{
    const {id} = req.params
    const todosList = await ToDoModel.find()
    let todoWithId = todosList.filter(todo => todo.headerId == id && !todo.done)
    if(!todoWithId.length){
        let todoToBeDeleted = todosList.filter(todo => todo.headerId == id && todo.id)
        for (todoId in todoToBeDeleted) {
            const todo = await ToDoModel.findById(todoId)
            await todo.remove()
        }

        const todoHeader = await ToDoHeadersModel.findById(id)
        await todoHeader.remove()
        res.status(200).send(`${id} removed`)

    }else{
        res.status(400).send("Header has todos associated")
    }
    
}

module.exports = {
    getHeaders,
    postHeaders,
    getHeadersById,
    updateHeadersById,
    deleteHeadersById
}