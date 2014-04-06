module.exports = {
  "/:slug": function(req, res) {
    models.Page.find({homepage:false}, function(err, menuItems){
      menuItems.sort(function(obj1,obj2){ return obj1.order - obj2.order})
      models.Page.findOne({ slug: req.param("slug") }, function(err, page){
        if (page){
          return res.render(page.layout, {
            menuItems:  menuItems,
            page     :  page
          }); 
        }else{
          models.Page.findOne({ homepage: true }, function(err, page){
            if(!err){
              return res.render(page.layout, {
                menuItems : menuItems,
                page      : page
              });
            }else{
              console.log(err)
            }
          });
        }
      }); 
    }); 
  },
}
 
