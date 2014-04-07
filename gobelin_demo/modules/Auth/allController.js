var bcrypt = require('bcrypt');
module.exports = {
  login    :  function(req, res) {
    if (req.method != "POST"){
      return res.view({
      layout   :  "admin.ejs",                
      });                 
    }
    if (!req.body.username|| !req.body.password){
      return res.view({
      layout   :  "admin.ejs",
      message  :  "Please fill in all fields",
      type     :  "error"                 
      });                  
    }
    User.findOne({Username : req.body.username}, function (err, user){
      if (!user){
        return res.view({
          layout   :  "admin.ejs",
          message  :  "Username invalid",
          type     :  "error"                 
        });                    
      }
      bcrypt.compare(req.body.password, user.password, function (err, match) {
        if (err) res.json({ error: 'Server error' }, 500);
        if (match) {
          // password match
          req.session.user = user;
          res.redirect('/');
        } else {
          // invalid password
          if (req.session.user) req.session.user = null;
          return res.view({
            layout   :  "admin.ejs",
            message  :  "Password incorrect",
            type     :  "error"                 
          });
        }
      });
    });
  }
}