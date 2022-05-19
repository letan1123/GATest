const mongoose = require('mongoose')

const mapSchema = new mongoose.Schema ({
  date: {type:String, default:Date},
  budget:Number,
  time:String,
  country:String
})

const mapCollection = mongoose.model('Map', mapSchema)
module.exports = mapCollection
