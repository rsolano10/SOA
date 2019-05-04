var express = require('express');
var router = express.Router()
var catalogService = require('./catalog-service')
var usersService = require('./users-service')
var ordersService = require('./orders-service')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(catalogService)
router.use(usersService)
router.use(ordersService)

module.exports = router