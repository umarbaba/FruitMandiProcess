const express = require('express')
const path = require('path')
const endPoints = require('./endpoints');
const app = express()
const dbBridge = require('./db-bridge');
const environment = require('./environment');


app.get('/', function (req, res) {
    res.send('Home Page')
})

app.use(express.static(path.join(__dirname, 'statics')))
app.use('/', beforeActualRequest, endPoints.router);

function beforeActualRequest(req, res, next) {
    console.log("adding some log", req.params)
    next()
}



dbBridge.init().then(_ => {
    app.listen(3000, () => {
        console.log(`Server is listening at 3000`)
    })
    /* const httpServer = http.createServer(expressApp)
     httpServer.listen(environment.httpServerPort, _ => {
         console.log(`Server is up ${environment.httpServerPort}`)
     })*/

}).catch(err => {
    console.error(`Unable to connect to the DB after several retry`, err)
})