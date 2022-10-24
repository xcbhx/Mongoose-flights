const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
      type: String,
      required: true,
      enum: ['American', 'Delta', 'Southwest']
    },
    airport: {
      type: String,
      enum: ['JFK', 'LGA', 'PBI', 'GEO', 'LAX'],
      default: 'JFK'
    },
    flightNo: {
      type: Number,
      required: true,
      min: 10,
      max: 9999
    },
    departs: {
    type: Date,
    default: function() {
        return new Date().getFullYear();
    }
  }
});

  module.exports = mongoose.model('Flight', flightSchema);