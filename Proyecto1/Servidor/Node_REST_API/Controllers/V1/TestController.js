'use strict';

var request = require('request');

//Enviroment Selector
var envData = require('../../enviroments/Development');
if (process.env.NODE_ENV.trim() == 'production') { // production || debug
    envData = require('../../enviroments/Production');
}

//LogService
var logger = require('../../Services/LogService');

//Functions
exports.testFunc = async function (req, res) { //Endpoint Function, can only handle 1 session.
    //set Cors
    res.header("Access-Control-Allow-Origin", envData.Cors);
    //set Headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type, Accept");

    //Always surround with try/Catch
    try {
        logger.ReportAction("ActionDone");
        request
            .get('http://192.168.1.23/nodeTest')
            .on('response', function (response) {
                console.log(response.statusCode) // 200
                console.log(response.headers['content-type']) // 'image/png'
            });
        res.send('Some data');
    } catch (err) {
        logger.ReportError(err);
        res.json({
            "errorInternalCode": envData.Errors.GenericCatchException,
            "Message": err
        });
    }
};