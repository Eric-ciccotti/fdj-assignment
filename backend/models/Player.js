const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Player = new Schema({
  name: {
    type: String
  },
  position: {
    type: String
  },
  thumbnail: {
    type: String
  },
  signin: {
    amount: { type: Number },
    currency: {
      type: String
    }
  },
  born: { type: Date }
}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', Player);
