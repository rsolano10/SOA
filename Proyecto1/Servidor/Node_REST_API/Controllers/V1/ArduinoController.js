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
exports.controlSwitch = async function (req, res) { //Endpoint Function, can only handle 1 session.
    //set Cors
    res.header("Access-Control-Allow-Origin", envData.Cors);
    //set Headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type, Accept");

    //Always surround with try/Catch
    try{
        logger.ReportAction("ActionDone");
        request
        .get(`http://${envData.arduinoIP}/${req.body.action}`)
        .on('response', function(response) {
            logger.ReportAction(response.statusCode);
        })
        .on('error', function(err) {
            logger.ReportError(err);
          })
        res.json({status:200});
    }catch(err){
        logger.ReportError(err);
        res.json({
            "errorInternalCode": envData.Errors.GenericCatchException,
            "Message": err
        });
    }
};