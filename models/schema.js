const mongoose = require('mongoose')

const socialSchema = new mongoose.Schema ({
  title: {type:String, required:true, minLength:3},
  text: {type:String, required:true, maxLength:100},
  media: {
    image:{type:String, default:null},
    video:{type:String, default:null}
  }
})

const socialCollection = mongoose.model('Social', socialSchema)
module.exports = socialCollection
