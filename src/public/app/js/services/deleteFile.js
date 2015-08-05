(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name cookBookApp.deleteFile
	 * @description
	 * # deleteFile
	 * Service in the cookBookApp.
	 */

	angular.module('cookBookApp').factory('deleteFile', deleteFile);

    deleteFile
        .$inject = [
        '$resource',
        'DELETE_FILE'
    ];

	function deleteFile($resource, DELETE_FILE) {
	    var endpointUrl = DELETE_FILE;
	    return $resource(endpointUrl, {},
	      {
	        'post': { method: 'POST', isArray: false }
	      }
	    );
	  }

}());