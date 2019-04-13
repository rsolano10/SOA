/* eslint-disable func-names */
const request = require('request')

// mysql
const mysql = require('mysql')

// Enviroment Selector
// eslint-disable-next-line import/no-unresolved
let envData = require('../../enviroments/Development')

if (process.env.NODE_ENV.trim() === 'production') { // production || debug
    // eslint-disable-next-line import/no-unresolved
    envData = require('../../enviroments/Production')
}

// LogService
const logger = require('../../Services/LogService')

// mysql con
const sqlCon = envData.mysqlCon
const con = mysql.createConnection(sqlCon)

con.connect((err) => {
    if (err) {
        logger.ReportError(err)
    }
})

// Functions
exports.controlSwitch = async function (req, res) {
    // set Cors
    res.header('Access-Control-Allow-Origin', envData.Cors)
    // set Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept')
    // Always surround with try/Catch
    try {
        logger.ReportAction('ActionDone')
        request
            .get(`http://${envData.arduinoIP}/${req.body.action}`)
            .on('response', (response) => {
                logger.ReportAction(response.statusCode)
            })
            .on('error', (err) => {
                logger.ReportError(err)
            })
        res.json({ status: 200 })
    } catch (err) {
        logger.ReportError(err)
        res.json({
            errorInternalCode: envData.Errors.GenericCatchException,
            Message: err,
        })
    }
}

exports.saveStat = async function (_req, res) { // Endpoint Function, can only handle 1 session.
    // set Cors
    res.header('Access-Control-Allow-Origin', envData.Cors)
    // set Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept')

    // Always surround with try/Catch
    try {
        console.log(_req.query.data)
        const sql = 'INSERT INTO Stats (currentStat,dateStat,userStat) VALUES (?,?,?)'
        con.query(sql, [_req.query.data, new Date(), 'user'], (err, result) => {
            if (err) {
                logger.ReportError(err)
                res.json({
                    errorInternalCode: envData.Errors.GenericCatchException,
                    Message: err,
                })
            } else {
                logger.ReportAction('stat saved')
                if (result.affectedRows > 0) {
                    res.json({
                        status: 'ok',
                    })
                } else {
                    res.json({
                        status: 'error',
                    })
                }
            }
        })
    } catch (err) {
        logger.ReportError(err)
        res.json({
            errorInternalCode: envData.Errors.GenericCatchException,
            Message: err,
        })
    }
}
