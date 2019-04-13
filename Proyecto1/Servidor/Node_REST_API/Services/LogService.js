/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
// file manager
const fs = require('fs')

// Enviroment Selector
let envData = require('../enviroments/Development')

if (process.env.NODE_ENV.trim() === 'production') { // production || debug
    envData = require('../enviroments/Production')
}

// Functions
// eslint-disable-next-line func-names
exports.ReportAction = async function (msg) {
    if (envData.Logs.Actions) {
        try {
            fs.appendFile('./Traceability/LogActions.txt', `Log Reported - ${ new Date().toISOString() }- Message:${ msg }\n`, (err) => {
                if (err) throw err
                // eslint-disable-next-line no-console
                console.log('Log Reported to LogActions')
            })
        } catch (exc) {
            // eslint-disable-next-line no-console
            console.log(`Log could not be reported, message found: ${ exc }`)
        }
    }
}

exports.ReportError = async function (msg) {
    if (envData.Logs.Errors) {
        try {
            fs.appendFile('./Traceability/LogErrors.txt', `Log Reported - ${ new Date().toISOString() }- Message:${ msg }\n`, (err) => {
                if (err) throw err
                // eslint-disable-next-line no-console
                console.log('Log Reported to LogErrors')
            })
        } catch (exc) {
            // eslint-disable-next-line no-console
            console.log(`Log could not be reported, message found: ${ exc }`)
        }
    }
}
