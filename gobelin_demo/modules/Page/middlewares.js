module.exports = {
  "/knowledge" : function(req,res,next){
    res.locals.session1 = "User not logged into in"
    next()
  },
  "/" : function(req,res,next){
    res.locals.session1 = "User logged in"
    next()
  }
}
