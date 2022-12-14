const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Team = new Schema({
  name: {
    type: String
  },
  thumbnail: {
    type: String
  },
  players: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
  },
}, {
  collection: 'teams'
})

module.exports = mongoose.model('Team', Team);


