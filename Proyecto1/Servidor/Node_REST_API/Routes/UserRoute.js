'use strict'; // To run in strict mode

module.exports = function (app) {

    //Calling the Controller	
    var userController = require('../Controllers/' + process.env.VERSION_API + '/UserController');

    //Routing 
    app.route('/api/' + process.env.VERSION_API + '/user') 
        .get(userController.getUser)
        .post(userController.postUser)
        .put(userController.updateUser);

};