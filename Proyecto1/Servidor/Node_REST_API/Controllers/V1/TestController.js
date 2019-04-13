const request = require('request')

// Enviroment Selector
// eslint-disable-next-line import/no-unresolved
let envData = require('../../enviroments/Development')

if (process.env.NODE_ENV.trim() === 'production') { // production || debug
    // eslint-disable-next-line import/no-unresolved
    envData = require('../../enviroments/Production')
}

// LogService
const logger = require('../../Services/LogService')

// Functions
// eslint-disable-next-line func-names
exports.testFunc = async function (_req, res) { // Endpoint Function, can only handle 1 session.
    // set Cors
    res.header('Access-Control-Allow-Origin', envData.Cors)
    // set Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept')

    // Always surround with try/Catch
    try {
        res.send(_req.query.data)
    } catch (err) {
        logger.ReportError(err)
        res.json({
            errorInternalCode: envData.Errors.GenericCatchException,
            Message: err,
        })
    }
}
