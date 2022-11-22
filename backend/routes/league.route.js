const express = require('express')
const app = express()
const leagueRoute = express.Router()

// League model
let League = require('../models/League')


// Get All Leagues
leagueRoute.route('/').get((req, res) => {
  League.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



module.exports = leagueRoute
