// dependencies
var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var multer  = require('multer');
var done = false;
var filenameSave = '';
var fs = require('fs');

/*Configure the multer.*/

router.use(multer({ dest: 'src/public/',
	changeDest: function(dest, req, res) {
	    return dest + req.body.username + '/uploads/';
	},
	rename: function (fieldname, filename, req, res) {
		var filenameForSave = Date.now()+filename;
		filenameSave = "uploads/"+filenameForSave+'.'+req.body.extention;
		return filenameForSave;
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path);
		done=true;
	}
}));


// db
var Recipes = require("../../dbmodels/Recipes").Recipes;
var RecipeHistory = require("../../dbmodels/ReceipeHistory").ReceipeHistory;

/**
*	Return all receipes
*/
router.get('/api/recipes', function(req, res){
	Recipes.find({}, function(err, recipes) {
		if (err) {console.log(err); res.send(err); return;}
		var recipesMap = {};

		recipes.forEach(function(recipe) {
		  recipesMap[recipe._id] = recipe;
		});
		res.send({
			recipes: recipesMap
		});
	});
});

/**
* Delete receipe
* @params{string} receipe id - req.query.id
*/
router.delete('/api/recipes', function(req, res){
	Recipes.remove({_id: req.query.id}, function(err, recipes) {
		if (err) {console.log(err); res.send(err); return;}
		res.send("Receipe deleted");
	});
});

/**
* Return one receipe by id
* @params{string} receipe id - req.query.id
*/
router.get('/api/recipe/:id', function(req, res){
	Recipes.findOne({ _id: req.params.id }, function(err, recipe) {
		if (err) {console.log(err); res.send(err); return;}
		res.send({
			recipe: recipe
		});
	});
});

/**
* Create new receipeHistory item
*/
router.post('/api/recipe_history', function(req, res){
	var newRecipe = new RecipeHistory({
			_id         : shortid.generate(),
			recId		: req.body.recId,
			name        : req.body.name,
			description : req.body.description,
			category	: req.body.role,
			image		: req.body.image,
		});
	newRecipe.save(function (err) {
	  if (err) {console.log(err); res.send(err); return;}
	  console.log('recipe history' + req.body.name + 'saved');
	  res.send('recipe history added success');
	});
});

/**
* Return  history items
*/
router.get('/api/recipe_history', function(req, res){
	RecipeHistory.find({}, function(err, history) {
		if (err) {console.log(err); res.send(err); return;}
		res.send({ history: history });
	});
});

/**
* Create new receipe
*/
router.post('/api/recipes', function(req, res){
	var newRecipe = new Recipes({
			_id         : shortid.generate(),
			name        : req.body.name,
			description : req.body.description,
			category	: req.body.role,
			image		: filenameSave
		});
	newRecipe.save(function (err) {
	  if (err) {console.log(err); res.send(err); return;}
	  console.log('recipe ' + req.body.name + 'saved');
	  res.send({receipe: newRecipe, resMessage : 'recipe added success'});
	});
});

/**
* Update receipe
*/
router.post('/api/update_receipe', function(req, res){
	var newRecipe = {
		name        : req.body.name,
		description : req.body.description,
		image		: !!filenameSave ? filenameSave : req.body.image,
		_id          : req.body._id
	};
	Recipes.update({_id: req.body._id }, newRecipe ,{},function(err, result) {
	    if (err) { console.log(err); res.send(err); return;}
	    filenameSave = '';
	    console.log('recipe ' + req.body.name + ' updated');
	    res.send({ receipe: newRecipe, resMessage : 'recipe update success' });
  	});
});

/**
* Delete file
*/
router.post('/api/delete_file', function(req, res){
	fs.unlinkSync('src/public/app/' + req.body.file, function (err) {
	  if (err) throw err;
	  console.log('successfully deleted ' + req.body.file);
	});
});

/**
* Upload file
*/
router.post('/api/photo', function(req, res){
	if(done === true){
		res.end("File uploaded.");
	}
});

module.exports = router;