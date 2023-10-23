const mongoose = require('mongoose')

const dailyTaskModel = require('../models/dailyTaskModel')

const getDailyTask = async(req, res) => {
    // res.status(200).json({message: 'Todos from router'})
    const dailyTaskList = await dailyTaskModel.find()
    res.status(200).json(dailyTaskList)
}


const updateDailyTask = async(req, res) => {
    // res.status(200).json({message: 'Headers from router'})
    const {title, done=false} = req.body
    const{id} = req.params
    if (!title) {
        res.status(400).send('Please add a text field')
    }

    if(await dailyTaskModel.findById(id)){
        const result = await dailyTaskModel.findByIdAndUpdate(id, {
            title, done
        })
        res.status(200).json(result)
    }else{
        res.status(400).send("ID associated with daily task is incorrect")
    }
}

module.exports = {
    getDailyTask,
    updateDailyTask
}