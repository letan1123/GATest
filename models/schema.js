const mongoose = require('mongoose')

const socialSchema = new mongoose.Schema ({
  title: {type:String, required:true},
  text: {type:String, required:true},
  image: String,
  video: String
})

const socialCollection = mongoose.model('Social', socialSchema)
module.exports = socialCollection
