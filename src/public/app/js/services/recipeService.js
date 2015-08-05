(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name cookBookApp.recipeService
	 * @description
	 * # recipeService
	 * Service in the cookBookApp.
	 */

	angular.module('cookBookApp').factory('recipeService', recipeService);

    recipeService
        .$inject = [
        '$resource',
        'RECIPES_API'
    ];

	function recipeService($resource, RECIPES_API) {
	    var endpointUrl = RECIPES_API;
	    return $resource(endpointUrl, {},
	      {
	        'query': 	{ method: 'GET',  isArray: false },
	        'post': 	{ method: 'POST', isArray: false },
	        'delete':   { method: 'DELETE', isArray: false },
	      }
	    );
	  }

}());