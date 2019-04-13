/* eslint-disable func-names */
module.exports = function (app) {
    // Calling the Controller
    // eslint-disable-next-line import/no-dynamic-require
    const userController = require(`../Controllers/${ process.env.VERSION_API }/UserController`)

    // Routing
    app.route(`/api/${ process.env.VERSION_API }/user`)
        .get(userController.getUser)
        .post(userController.postUser)
        .put(userController.updateUser)
}
