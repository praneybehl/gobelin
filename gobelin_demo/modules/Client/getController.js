module.exports = {
  index : function(req, res){
    models.page.find({}, function(err,docs) {
      res.render("index");
    })
  }
}
