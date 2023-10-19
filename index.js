const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000;
const connectDB = require('./config/db')

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{
    res.send("Hello Shleeji")
})

app.use('/api/headers', require('./routes/todoHeadersRoute'))
app.use('/api/todos', require('./routes/todoRoute'))

app.listen(port,()=> console.log("Server has been initaited"))