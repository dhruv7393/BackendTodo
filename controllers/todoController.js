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
    const {title, imp, headerId, done=false } = req.body
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
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        addedOn = `${currentMonth}-${currentDay}-${currentYear}`;
    }

    const todoHeadersList = await ToDoHeadersModel.findById(headerId)
    if(headerId == todoHeadersList["_id"]){
        const result = await ToDoModel.create({
            _id: new mongoose.Types.ObjectId(),
            headerId, title, imp, addedOn, done
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
    const {title, imp, headerId,done=false } = req.body
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
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        addedOn = `${currentMonth}-${currentDay}-${currentYear}`;
    }

    const todoHeadersList = await ToDoHeadersModel.findById(headerId)
    if(headerId == todoHeadersList["_id"]){
        const result = await ToDoModel.findByIdAndUpdate(id, {
            headerId, title, imp, addedOn, done
        })
        res.status(200).json(result)
    }else{
        res.status(400).send("Please add header to associate todo")
    }
}

const deleteTodo = async(req, res) => {
    const {id} = req.params
    const todo = await ToDoModel.findById(id)
    console.log(todo)
    if(!todo){
        res.status(400).send("Todo not found")
    }
    await todo.remove()
    res.status(200).send(`${id} removed`)
}

module.exports = {
    getToDos,
    postToDo,
    getToDosById,
    updateTodo,
    deleteTodo
}