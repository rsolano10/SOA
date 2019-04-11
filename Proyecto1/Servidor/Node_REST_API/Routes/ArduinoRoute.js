'use strict'; // To run in strict mode

module.exports = function (app) {

    //Calling the Controller	
    var arduinoController = require('../Controllers/' + process.env.VERSION_API + '/ArduinoController');

    //Routing 
    app.route('/api/' + process.env.VERSION_API + '/arduino') 
        .post(arduinoController.controlSwitch);

};