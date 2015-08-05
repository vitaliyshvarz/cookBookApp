(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name cookBookApp.recipeHistoryService
	 * @description
	 * # recipeHistoryService
	 * Service in the cookBookApp.
	 */

	angular.module('cookBookApp').factory('recipeHistoryService', recipeHistoryService);

    recipeHistoryService
        .$inject = [
        '$resource',
        'RECEIPE_HISTORY_API'
    ];

	function recipeHistoryService($resource, RECEIPE_HISTORY_API) {
	    var endpointUrl = RECEIPE_HISTORY_API;
	    return $resource(endpointUrl, {},
	      {
	        'query': { method: 'GET', isArray: false },
	        'post': { method: 'POST', isArray: false }
	      }
	    );
	  }

}());