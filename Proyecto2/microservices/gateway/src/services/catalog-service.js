var express = require('express');
var router = express.Router()
const apiAdapter = require('../adapter/api-adapter')
const BASE_URL = 'http://localhost:5000' // url to service
const api = apiAdapter(BASE_URL)
console.log("CATALOG")

router.delete('/catalog', (req, res) => {
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.get('/catalog', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/catalog', (req, res) => {
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.put('/catalog', (req, res) => {
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})

module.exports = router