module.exports = {
  "/admin/page/newContent": function(req, res){
    if (req.body['slug']){
      models.Page.findOne({ slug: req.body["slug"] }, function(err, page){
        if (page){
          if (req.body["newContent"] && req.body["contentName"]){
            page.content[req.body["contentName"]] = req.body["newContent"];
            page.markModified('content')
            page.save(function(err){
              if (!err){
                io.sockets.emit("newContent",{"contentPlace":req.body["contentName"],"newContent":req.body["newContent"]});
              }
            });
          }
        }
      })
    }
  },
  // Reorder menu given a dictionary with the following properties :
  // String(slug)- The slug of the page
  // Int(order)  - The new position to assume
  '/admin/page/reorder': function(req, res){
    if (req.body.newPagesOrder){
      req.body.newPagesOrder.forEach(function(item){
        models.Page.findOne({slug:item.slug}, function(err, page){
          page.order = item.order;
          page.save(function(err){

          })
        })
      })
    }
  }
}
