module.exports = {
  testt : function(req,res,next){
    res.locals.session1 = "User not logged into in"
    next()
  }
}
