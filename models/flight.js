const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    required: true,
    enum: ['JFK', 'LGA', 'PBI', 'GEO', 'LAX']
  },
  arrival: {
    type: Date,
  }
}, {
  timestamps: true
});


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
        return new Date().setFullYear(new Date().getFullYear() + 1);
    } 
  },
  destinations: [destinationSchema]
}, {
  timestamps: true
});

  module.exports = mongoose.model('Flight', flightSchema);