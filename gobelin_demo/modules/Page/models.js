slug = require("slug")
Page = new Schema({
  slug:{type:String},
  name:{type:String},
  content:{type:Schema.Types.Mixed},
  layout:{type:String},
  bot_picture:{type:String},
  order:{type:Number}
},{
  strict:false,
  collection:"page"
})
Page.methods.getContentByName = function (params, callback) {
  return this.content[params]
}
Page.pre('save', function(next){
  this.slug = slug(this.name).toLowerCase()
  next()
})
module.exports = {
  Page : Page
}
