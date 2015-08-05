(function () {

	'use strict';
	/**
	* @ngdoc constants
	* @name cookbook.constants
	* @description
	* constants in the cookbookApp.
	*/
	angular.module('cookBookApp')
	.constant('RECIPES_API', '/api/recipes')
	.constant('RECIPE_PHOTO_UPLOAD', '/api/photo')
	.constant('RECEIPE_API', '/api/recipe/:id')
	.constant('RECEIPE_HISTORY_API', '/api/recipe_history')
	.constant('RECEIPE_UPDATE_API', '/api/update_receipe')
	.constant('DELETE_FILE', '/api/delete_file');

}());