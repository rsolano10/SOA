var express = require('express');
var router = express.Router()
const apiAdapter = require('../adapter/api-adapter')
const BASE_URL = 'http://localhost:8088' // url to service
const api = apiAdapter(BASE_URL)

router.delete('/users', (req, res) => {
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.get('/users', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/users', (req, res) => {
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.put('/users', (req, res) => {
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router