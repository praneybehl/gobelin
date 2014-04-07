module.exports = {
  port          : 8081, // Port to be used for the server
  db  : {
    url         : ""  , // Url to your mongo database
    port        : ""  , // Port of your mongo database. Default is 27017
    name        : ""  , // Name of your mongo database
    user        : ""  , // Credentials to be used to enter the database
    password    : ""
  },
  sessionSecret : ""    // Session secret. Make it unique.
}
