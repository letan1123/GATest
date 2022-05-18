const mongoose = require('mongoose')

const mapSchema = new mongoose.Schema ({
  date: Date,
  budget:Number,
  time:String
})

const mapCollection = mongoose.model('Map', mapSchema)
module.exports = mapCollection
