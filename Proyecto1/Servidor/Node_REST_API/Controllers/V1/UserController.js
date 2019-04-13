'use strict';

//Enviroment Selector
var envData = require('../../enviroments/Development');
if (process.env.NODE_ENV.trim() == 'production') { // production || debug
    envData = require('../../enviroments/Production');
}

//LogService
var logger = require('../../Services/LogService');

//mysql
var mysql = require('mysql');
var sqlCon = envData.mysqlCon;
var con = mysql.createConnection(sqlCon);

con.connect(function (err) {
    if (err) {
        logger.ReportError(err);
        return;
    }
    console.log("Connected!");
});


//Functions
exports.getUser = async function (req, res) { //Endpoint Function, can only handle 1 session.
    //set Cors
    res.header("Access-Control-Allow-Origin", envData.Cors);
    //set Headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type, Accept");

    //Always surround with try/Catch
    try {
        var sql = "SELECT username, password FROM Users WHERE username=? AND password =? LIMIT 1";
        con.query(sql, [req.query.username, req.query.password], function (err, result) {
            if (err) {
                logger.ReportError(err);
                res.json({
                    "errorInternalCode": envData.Errors.GenericCatchException,
                    "Message": err
                });
                return
            }
            else {
                logger.ReportAction("user auth executed");
                if (result.length > 0) {
                    res.json({
                        user: result[0].username,
                        auth: true
                    });
                }
                else {
                    res.json({
                        user: "",
                        auth: false
                    });
                }
            }

        });
    } catch (err) {
        logger.ReportError(err);
        res.json({
            "errorInternalCode": envData.Errors.GenericCatchException,
            "Message": err
        });
    }
};

exports.postUser = async function (req, res) { //Endpoint Function, can only handle 1 session.
    //set Cors
    res.header("Access-Control-Allow-Origin", envData.Cors);
    //set Headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type, Accept");

    //Always surround with try/Catch
    try {
        var sql = "INSERT INTO Users (username,password) VALUES (?,?)";
        con.query(sql, [req.body.username, req.body.password], function (err, result) {
            if (err) {
                logger.ReportError(err);
                res.json({
                    "posted": false,
                    "errorInternalCode": envData.Errors.GenericCatchException,
                    "Message": err
                });
                return
            }
            else {
                if (result.affectedRows > 0) {
                    res.json({
                        posted: true
                    });
                }
                else {
                    res.json({
                        posted: false
                    });
                }
            }

        });
    } catch (err) {
        logger.ReportError(err);
        res.json({
            "errorInternalCode": envData.Errors.GenericCatchException,
            "Message": err
        });
    }
};

exports.updateUser = async function (req, res) { //Endpoint Function, can only handle 1 session.
    //set Cors
    res.header("Access-Control-Allow-Origin", envData.Cors);
    //set Headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type, Accept");

    //Always surround with try/Catch
    try {
        var sql = "UPDATE Users SET username = ?, password = ? WHERE username = ?";
        con.query(sql, [req.body.username, req.body.password, req.body.idUser], function (err, result) {
            if (err) {
                logger.ReportError(err);
                res.json({
                    "updated": false,
                    "errorInternalCode": envData.Errors.GenericCatchException,
                    "Message": err
                });
                return
            }
            else {
                if (result.affectedRows > 0) {
                    res.json({
                        updated: true
                    });
                }
                else {
                    res.json({
                        updated: false
                    });
                }
            }

        });
    } catch (err) {
        logger.ReportError(err);
        res.json({
            "errorInternalCode": envData.Errors.GenericCatchException,
            "Message": err
        });
    }
};