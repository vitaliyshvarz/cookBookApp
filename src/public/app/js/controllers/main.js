(function () {
	'use strict';

	/**
	 * Main controller of cookBookApp
	 */
	angular.module('cookBookApp').controller('MainCtrl', MainCtrl);

	MainCtrl
		.$inject = [
		'$scope',
		'$routeSegment',
		'initialData',
		'recipeFactory',
		'$translate'
	];

	function MainCtrl($scope, $routeSegment, initialData, recipeFactory, $translate) {

		$scope.lang = $translate.use();

	    // change language
		$scope.changeLanguage = function (langKey) {
			$translate.use(langKey);
			$scope.lang = $translate.use();
		};
	}

}());
