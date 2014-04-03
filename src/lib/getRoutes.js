var fs = require("fs"),
    path = require("path"),
    util = require("util")
   
module.exports = {
  getRoutes : function (cb){
    dir = util.format("%smodules", location)
    fs.readdir(dir, function (err, files) {
      if (err) {
          throw err;
      }

      files.map(function (file) {
          return path.join(dir, file)
      }).forEach(function (file) {
          module = file.split('/').slice(-1)[0]
          console.log("Loading module : %s", module.bold.green)
          controller = require(util.format("%s/%s",file,"controller.js"))
          Object.keys(controller).forEach(function(key) {
            var func = controller[key];
            app.get(util.format('/%s/%s',module,key), func)
          });
      })
      cb()
    });
  }
}