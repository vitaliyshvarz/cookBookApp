(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name cookBookApp.updateRecipeService
	 * @description
	 * # updateRecipeService
	 * Service in the cookBookApp.
	 */

	angular.module('cookBookApp').factory('updateRecipeService', updateRecipeService);

    updateRecipeService
        .$inject = [
        '$resource',
        'RECEIPE_UPDATE_API'
    ];

	function updateRecipeService($resource, RECEIPE_UPDATE_API) {
	    var endpointUrl = RECEIPE_UPDATE_API;
	    return $resource(endpointUrl, {},
	      {
	        'post': 	{ method: 'POST', isArray: false }
	      }
	    );
	  }

}());