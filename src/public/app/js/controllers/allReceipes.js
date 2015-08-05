(function () {
	'use strict';

	/**
	 * allReceipesCtrl controller of cookBookApp
	 */
	angular.module('cookBookApp').controller('allReceipesCtrl', allReceipesCtrl);

	allReceipesCtrl
		.$inject = [
		'$scope',
		'$routeSegment',
		'initialData',
		'recipeFactory',
		'$translate'
	];

	function allReceipesCtrl($scope, $routeSegment, initialData, recipeFactory, $translate) {

	    $scope.recipes = initialData.recipes.recipes;

	}

}());
