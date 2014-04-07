var bcrypt = require('bcrypt');
module.exports = {
  "/login":function(req,res){
    if (!req.body.username) res.json({ error:'Enter a username!'})
    models.User.findOne({ username:req.body.username }, function(err, user){
      if(user){
        bcrypt.compare(req.body.password, user.password, function(err, match){
          if (match) {
            req.session.user = user.id
            res.json(user)
          }else{
            res.json({ error:'Invalid password' });
          }
        })
      }
    })
  }
}
