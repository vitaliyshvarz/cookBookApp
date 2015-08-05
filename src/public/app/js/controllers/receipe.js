(function () {
	'use strict';

	/**
	 * receipe controller of cookBookApp
	 */
	angular.module('cookBookApp').controller('ReceipeCtrl', ReceipeCtrl);

	ReceipeCtrl
		.$inject = [
		'$scope',
		'$routeSegment',
		'initialData'
	];

	function ReceipeCtrl($scope, $routeSegment, initialData) {

		$scope.receipeId = $routeSegment.$routeParams.id;
		$scope.receipe = initialData.recipe.recipe;
		$scope.history = initialData.history;

		//tabs
		$scope.showReceipe = true;
		$scope.showHistory = false;
		$scope.showEdit = false;

		$scope.showSection = function(section){
			$scope.showReceipe = false;
			$scope.showHistory = false;
			$scope.showEdit = false;
			$scope[section] = true;
		};
	}

}());
