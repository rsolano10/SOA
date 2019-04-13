/* eslint-disable func-names */
module.exports = function (app) {
    // Calling the Controller
    // eslint-disable-next-line import/no-dynamic-require
    const testController = require(`../Controllers/${ process.env.VERSION_API }/TestController`)

    // Routing
    app.route(`/api/${ process.env.VERSION_API }/test`)
        .get(testController.testFunc)
}
