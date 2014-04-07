module.exports = {
  "/":function(req,res,next){
    res.locals.pageViews = pathToModuleViews
    next()
  }
}
