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
// eslint-disable-next-line func-names
exports.getUser = async function (req, res) { // Endpoint Function, can only handle 1 session.
    // set Cors
    res.header('Access-Control-Allow-Origin', envData.Cors)
    // set Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept')

    // Always surround with try/Catch
    try {
        const sql = 'SELECT username, password FROM Users WHERE username=? AND password =? LIMIT 1'
        con.query(sql, [req.query.username, req.query.password], (err, result) => {
            if (err) {
                logger.ReportError(err)
                res.json({
                    errorInternalCode: envData.Errors.GenericCatchException,
                    Message: err,
                })
            } else {
                logger.ReportAction('user auth executed')
                if (result.length > 0) {
                    res.json({
                        user: result[0].username,
                        auth: true,
                    })
                } else {
                    res.json({
                        user: '',
                        auth: false,
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

// eslint-disable-next-line func-names
exports.postUser = async function (req, res) { // Endpoint Function, can only handle 1 session.
    // set Cors
    res.header('Access-Control-Allow-Origin', envData.Cors)
    // set Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept')

    // Always surround with try/Catch
    try {
        const sql = 'INSERT INTO Users (username,password) VALUES (?,?)'
        con.query(sql, [req.body.username, req.body.password], (err, result) => {
            if (err) {
                logger.ReportError(err)
                res.json({
                    posted: false,
                    errorInternalCode: envData.Errors.GenericCatchException,
                    Message: err,
                })
            } else if (result.affectedRows > 0) {
                res.json({
                    posted: true,
                })
            } else {
                res.json({
                    posted: false,
                })
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

// eslint-disable-next-line func-names
exports.updateUser = async function (req, res) { // Endpoint Function, can only handle 1 session.
    // set Cors
    res.header('Access-Control-Allow-Origin', envData.Cors)
    // set Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept')

    // Always surround with try/Catch
    try {
        const sql = 'UPDATE Users SET username = ?, password = ? WHERE username = ?'
        con.query(sql, [req.body.username, req.body.password, req.body.idUser], (err, result) => {
            if (err) {
                logger.ReportError(err)
                res.json({
                    updated: false,
                    errorInternalCode: envData.Errors.GenericCatchException,
                    Message: err,
                })
                return
            }
            if (result.affectedRows > 0) {
                res.json({
                    updated: true,
                })
            } else {
                res.json({
                    updated: false,
                })
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
