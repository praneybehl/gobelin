module.exports = {
  "/page/newContent": function(req, res){
    if (req.param('slug')){
      models.Page.findOne({ slug: req.param("slug") }, function(err, page){
        if (page){
          if (req.param("newContent") && req.param("contentName")){
            page.content[req.param("contentName")] = req.param("newContent");
            page.save(function(err){
              if (!err){
                io.sockets.emit("newContent",{"contentPlace":req.param("contentName"),"newContent":req.param("newContent")});              
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
  '/page/reorder': function(req, res){
    if (req.param("newPagesOrder")){
      req.param("newPagesOrder").forEach(function(item){
        models.Page.findOne({slug:item.slug}, function(err, page){
          page.order = item.order;
          page.save(function(err){
             
          })        
        })      
      })
    }
  }
}
