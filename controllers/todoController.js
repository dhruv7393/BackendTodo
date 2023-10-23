const mongoose = require('mongoose')

/*
    @desc Get all todo 
    @route GET /api/todos
    @access Private
*/

const ToDoModel = require('../models/todoModel')
const ToDoHeadersModel = require('../models/todoHeaderModel')

const getToDos = async(req, res) => {
    // res.status(200).json({message: 'Todos from router'})
    const todosList = await ToDoModel.find()
    res.status(200).json(todosList)
}

const postToDo = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    const {title, imp, headerId, done=false, notes= '', completedOn='', completeBy='' } = req.body
    let {addedOn=''} = req.body
    if (!title) {
        res.status(400).send('Please add a text field')
    }

    if (!headerId) {
        res.status(400).send('Please add a header to be associated with')
    }

    if (!imp) {
        res.status(400).send('Please add wether header is pinned or not')
    }

    if(!addedOn){
        addedOn = new Date().toLocaleDateString();
    }

    const todoHeadersList = await ToDoHeadersModel.findById(headerId)
    if(headerId == todoHeadersList["_id"]){
        const result = await ToDoModel.create({
            _id: new mongoose.Types.ObjectId(),
            headerId, title, notes, imp, addedOn, done, completedOn, completeBy
        })
        res.status(200).json(result)
    }else{
        res.status(400).send("Please add header to associate todo")
    }
}

const getToDosById = async(req, res) => {
    // res.status(200).json({message: 'Todos from router'})
    const {id} = req.params
    const todoHeadersList = await ToDoModel.findById(id)
    res.status(200).json(todoHeadersList)
}

const updateTodo = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    const {title, imp, headerId,done=false, notes='', completedOn='', completeBy='' } = req.body
    let {addedOn=''} = req.body
    const{id} = req.params
    if (!title) {
        res.status(400).send('Please add a text field')
    }

    if (!headerId) {
        res.status(400).send('Please add a header to be associated with')
    }

    if (!imp) {
        res.status(400).send('Please add wether header is pinned or not')
    }

    if(!addedOn){
        addedOn = new Date().toLocaleDateString();
    }

    if(done){
        completedOn = new Date().toLocaleDateString();
    }

    const todoHeadersList = await ToDoHeadersModel.findById(headerId)
    if(headerId == todoHeadersList["_id"]){
        const result = await ToDoModel.findByIdAndUpdate(id, {
            headerId, title, notes, imp, addedOn, done, completedOn, completeBy
        })
        res.status(200).json(result)
    }else{
        res.status(400).send("Please add header to associate todo")
    }
}

const deleteTodo = async(req, res) => {
    const {id} = req.params
    const todo = await ToDoModel.findByIdAndDelete(id)
    if(!todo){
        res.status(400).send("Todo not found")
    }
    res.status(200).send(`${id} removed`)
}

module.exports = {
    getToDos,
    postToDo,
    getToDosById,
    updateTodo,
    deleteTodo
}