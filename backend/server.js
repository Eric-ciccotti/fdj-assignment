const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const uri = 'mongodb+srv://ericciccotti:hBVDByrTFK6hMglr@fdj-cluster.wnuibsw.mongodb.net/fdj-assignment?retryWrites=true&w=majority'

// Connecting with mongo db
mongoose
  .connect(uri)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

// Setting up port with express js
const leagueRoute = require('../backend/routes/league.route')
const playerRoute = require('../backend/routes/player.route')
const teamRoute = require('../backend/routes/team.route')


const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
app.use('/api/leagues/', leagueRoute)
app.use('/api/players', playerRoute)
app.use('/api/teams/', teamRoute)

// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message) // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})
