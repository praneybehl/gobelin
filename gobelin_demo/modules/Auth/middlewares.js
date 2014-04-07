module.exports = {
  "/" : function(req,res,next){
    if(req.session.user){
      models.User.findById(req.session.user, function(err,user){
        res.locals.user = user
      })
    }
    next()
  },
  "/admin" : function(req,res,next){
    if(req.session.user){
      models.User.findById(req.session.user, function(err,user){
        if(user.hasPermission('cms-admin')){
          next()
        }else{
          res.json({error:"Sorry Dave, I can't let you do that"})
        }
      })
    }else{
      res.json({error:'YOU MUST BE LOGGED IN TO DO THAT'})
    }
  }
}
