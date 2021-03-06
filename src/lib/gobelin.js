// Use commander to parse arguments
var program = require('commander')
var colors = require('colors')
var util = require('util')
var express = require('express');
var mongoose = require('mongoose')
var ncp = require('ncp').ncp
var getModules = require('../lib/getModules').getModules
var enableMultiViews = require('../lib/multiViews').enableMultiViews
var settings
program.version('0.1.1')
  .option('-s, --settings <settings>', 'Settings used to launch server. If empty, uses "settings.js" from current working directory.')
  .option('-l, --location <location>', 'Folder where the project is situated. If empty, uses the current working directory.')
  .option('-p, --port <n>', 'Override the port in settings. Not recommended.', parseInt)
  .parse(process.argv);


local = {
  run : function(){
    if(program.settings)
      settings = require(util.format('%s/%s',location, program.settings))
    else
      settings = require(util.format('%s/%s',location, "settings.js"))
    if(program.port)
      port = program.port
    else
      port = settings.port
    enableMultiViews(express)
    app = express()
    mongoose.connect(util.format('mongodb://%s:%s@%s:%s/%s',settings.db.user,settings.db.password,settings.db.url,settings.db.port,settings.db.name))
    Schema = mongoose.Schema
    app.use(express.cookieParser())
    app.use(express.session({ secret : settings.sessionSecret }))
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(express.compress())
    app.set('view engine', 'jade')
    //app.use(express.logger('dev'))
    app.locals.basedir = location+"views";
    viewsFolders=[]
    getModules(function(){
      app.set('views', viewsFolders);
      var server = app.listen(port, function() {
        console.log('\nGobelin is running with the following settings : '.bold)
        console.log('Port : '.bold + port.toString().green)
        console.log('Database : '.bold + util.format("%s@%s/%s:%s", settings.db.user, settings.db.url, settings.db.name, settings.db.port).green)
        console.log(util.format("Press %s to shut down the server.\n".bold, "CTRL+C".magenta))
      })
      io = require('socket.io').listen(server,{log:false});
    })
  },
  newApplication : function(){
    ncp(__dirname+"/skeleton/newApp", location, function(err){
      if (err){
        return console.log(err)
      }
      console.log('New application created!'.bold.green)
    })
  },
  newModule : function(){
    ncp(__dirname+"/skeleton/newModule", location+"modules/newModule", function(err){
      if (err){
        return console.log(err)
      }
      console.log('New module created!'.bold.green)
    })
  }
}

// Main
module.exports = {
  initialize : function (){
    if(!program.args[0])
      program.args[0] = "run"
    if(program.location){
      location = process.cwd() + '/' + program.location
      if(location[location.length - 1]!='/')
        location += "/"
    }else{
      location = process.cwd() + "/"
    }
    local[program.args[0]]()
  }
}
