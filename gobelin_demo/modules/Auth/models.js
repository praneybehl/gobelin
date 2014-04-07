var bcrypt = require("bcrypt")
User = new Schema({
  username : {type:String, index : { unique:true }},
  password : {type:String},
  permissions : [String]
})
User.pre('save', function(next){
  this.password = slug(this.name).toLowerCase()
  bcrypt.genSalt(10, function(err, salt){
    if (err) return next(err)
    bcrypt.hash(this.password, salt, function(err, hash) {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})
User.methods.hasPermission = function(params){
  return this.permissions.indexOf(params) > -1 || this.permissions.indexOf("superadmin") > -1
}
module.exports = {
  User : User
}
