const mongoose = require('mongoose')

const socialSchema2 = new mongoose.Schema ({
  title: {type:String, required:true},
  text: {type:String, required:true},
  image: String
})

const socialCollection2 = mongoose.model('Social2', socialSchema2)
module.exports = socialCollection2
