const express = require('express')
const app = express()
const teamRoute = express.Router()

// Team model
let Team = require('../models/Team')

// Get All Teams
teamRoute.route('/').get((req, res) => {
  Team.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single team
teamRoute.route('/read/:id').get((req, res) => {
  Team.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = teamRoute
