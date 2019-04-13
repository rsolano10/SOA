// Express
const express = require('express') // call express
const bodyParser = require('body-parser')

// Cors enable
const cors = require('cors')

// paths
const userRoute = require('./Routes/UserRoute')
const testRoute = require('./Routes/TestRoute')
const arduinoRoute = require('./Routes/ArduinoRoute')

// app
const app = express() // define our app using express

// Body Parser
app.use(bodyParser({ limit: '50mb' })) // extiende el limite de MB del cuerpo de la consulta
app.use(bodyParser.urlencoded({ extended: true })) // habilita el url encoded
app.use(bodyParser.json({ limit: '50mb' })) // extiende el limite de transferencia de objetos JSON

// ENV Configuration
require('dotenv').config()

let envData = require('./Enviroments/Development')

if (process.env.NODE_ENV.trim() === 'production') { // production || debug
    envData = require('./Enviroments/Production')
}
// eslint-disable-next-line no-console
console.log('Enviroment: ', process.env.NODE_ENV)

// set our port
let port = envData.HttpPort
if (envData.isSecure) {
    port = envData.HttpsPort
} else {
    port = envData.HttpPort
}

app.use(cors({ origin: envData.cors })) // habilita los Cors globalmente

// Public static folder
app.use(express.static('public')) // habilita un puerto de lectura de archivos estaticos 'public'

// Home Route... API DOcumentation
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: './Public/Views',
    })
})

// Provided Routes
testRoute(app)
userRoute(app)
arduinoRoute(app)

// START THE SERVER
// =============================================================================
app.listen(port)
// eslint-disable-next-line no-console
console.log(`Server started at port: ${port}`)
