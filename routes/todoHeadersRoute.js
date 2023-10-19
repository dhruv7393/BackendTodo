const express = require('express')
const router = express.Router()
const {getHeaders, postHeaders} = require('../controllers/todoHeadersController')

router.get('/', (req, res)=>{
    getHeaders(req, res)
})

router.post('/', (req, res)=>{
    postHeaders(req, res)
})

module.exports = router