var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    mongoose = require('mongoose')
// function used to load all controllers
function loadControllers(file){
  verbs = ["all","get","post","head","put","delete"]
  verbs.forEach(function (verb){
    pathToController = util.format("%s/%s%s",file, verb, "Controller.js")
    if (fs.existsSync(pathToController)) { 
      console.log(util.format("-- Loading controller ( %s )",verb.toUpperCase().bold))
      controller = require(pathToController)
      Object.keys(controller).forEach(function (key) {
        var func = controller[key];
        app[verb](util.format('/%s/%s',module,key), func)
      }) 
    } 
  })
}

function loadModels(file){
  pathToModel = util.format("%s/%s",file, "models.js")
  if (fs.existsSync(pathToModel)) {
    console.log("-- Loading models")
    model = require(pathToModel)
    Object.keys(model).forEach(function (key) {
      models[key] = mongoose.model(key, model[key])
    })
  }
}


module.exports = {
  getModules : function (cb){
    dir = util.format("%smodules", location)
    models = []
    fs.readdir(dir, function (err, files) {
      if (err) {
          throw err;
      }

      files.map(function (file) {
          return path.join(dir, file)
      }).forEach(function (file) {
          module = file.split('/').slice(-1)[0]
          console.log("Loading module : %s", module.bold.green)
          loadModels(file)
          loadControllers(file)
      })
      cb()
    });
  }
}
