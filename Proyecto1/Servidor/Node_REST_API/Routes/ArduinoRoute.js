// eslint-disable-next-line func-names
module.exports = function (app) {
    // Calling the Controller
    // eslint-disable-next-line import/no-dynamic-require
    const arduinoController = require(`../Controllers/${ process.env.VERSION_API }/ArduinoController`)

    // Routing
    app.route(`/api/${ process.env.VERSION_API }/arduino`)
        .post(arduinoController.controlSwitch)

    app.route(`/api/${ process.env.VERSION_API }/stat`)
        .get(arduinoController.saveStat)
}
