const mongoose = require('mongoose')

const dailyTaskModel = require('../models/dailyTaskModel')

const getDailyTask = async(req, res) => {
    // res.status(200).json({message: 'Todos from router'})
    const dailyTaskList = await dailyTaskModel.find()
    res.status(200).json(dailyTaskList)
}


const updateDailyTask = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    let {title, done=false, edited, pending} = req.body
    if(!parseInt(pending)){
        done=true
    }
    const{id} = req.params
    if (!title) {
        res.status(400).send('Please add a text field')
    }

    if(await dailyTaskModel.findById(id)){
        const result = await dailyTaskModel.findByIdAndUpdate(id, {
            title, done, edited, pending
        })
        res.status(200).json(result)
    }else{
        res.status(400).send("ID associated with daily task is incorrect")
    }
}

const setPendingTask = async(req, res) => {
    const dailyTaskList = await dailyTaskModel.find()
    const today = new Date().toLocaleDateString()

    dailyTaskList.forEach(async(task) => {
        task.pending = (parseInt(task.pending)  + Math.ceil((new Date(new Date().toLocaleDateString()) - new Date(task.edited))/ (1000 * 60 * 60 * 24))).toString()
        task.edited = today
        if(!parseInt(task.pending)){
            task.done=true
        }
        const result = await dailyTaskModel.findByIdAndUpdate(task._id, task)
    })
    
    res.status(200).json(dailyTaskList)
}

module.exports = {
    getDailyTask,
    updateDailyTask,
    setPendingTask
}