module.exports = {
  index : function(req, res){
    models.Client.find({}, function(err,docs) {
      res.render("index");
    })
  }
}
