const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let League = new Schema({
  name: {
    type: String
  },
  sport: {
    type: String
  },
  teams: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
  },
}, {
  collection: 'leagues'
})

module.exports = mongoose.model('League', League);
