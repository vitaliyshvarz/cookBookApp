(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name cookBookApp.oneRecipeService
	 * @description
	 * # oneRecipeService
	 * Service in the cookBookApp.
	 */

	angular.module('cookBookApp').factory('oneRecipeService', oneRecipeService);

    oneRecipeService
        .$inject = [
        '$resource',
        'RECEIPE_API'
    ];

	function oneRecipeService($resource, RECEIPE_API) {
	    var endpointUrl = RECEIPE_API;
	    return $resource(endpointUrl, {},
	      {
	        'query': { method: 'GET', isArray: false , params:{ id:'@id' }}
	      }
	    );
	  }

}());