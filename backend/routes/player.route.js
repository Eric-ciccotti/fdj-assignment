const express = require('express')
const app = express()
const playerRoute = express.Router()

// Player model
let Player = require('../models/Player')


// Get All Players
playerRoute.route('/').get((req, res) => {
  Player.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = playerRoute
