var mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
	_id: String,
	name: String,
    description: String,
    date: { type: Date, default: Date.now },
    image: String
});

var Recipes = mongoose.model('Recipes', RecipeSchema);
module.exports = {
  Recipes: Recipes
}