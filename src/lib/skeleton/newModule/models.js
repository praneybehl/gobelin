// Standard Mongoose models. Refer to the Mongoose API for details
// Such model would be accessible through models.Model in your controllers/middlewares

Model = new Schema({
  // Model attributes
})

Model.pre('save', function(next){
  // Function to execute before saving
})

Model.methods.myClassMethod = function(params){
  // Class methods for this model
}

module.exports = {
  Model : Model
}
