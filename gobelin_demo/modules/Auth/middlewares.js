module.exports = {
  test : function(req,res,next){
    res.locals.session = "User not logged in"
    next()
  }
}
