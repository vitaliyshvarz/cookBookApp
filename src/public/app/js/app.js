(function () {
	'use strict';
	/**
	 * @ngdoc service
	 * @name cookBookApp
	 * @description
	 * # siteServerServices
	 * main app cookBookApp
	 */

	var app = angular.module('cookBookApp',
		[ 'ngResource',
			'ngRoute',
			'ngAnimate',
			'route-segment',
			'view-segment',
			'ngDialog',
			'pascalprecht.translate',
			'ngFileUpload'
		]);

	app.config(['$routeSegmentProvider',
		'$routeProvider',
		'$translateProvider',
		function($routeSegmentProvider, $routeProvider, $translateProvider) {
	    $routeSegmentProvider.options.autoLoadTemplates = true;
	    $routeSegmentProvider

	        .when('/main',                  'main')
	        .when('/main/allReceipes',      'main.allReceipes')
	        .when('/main/addRecipe',        'main.addRecipe')
	        .when('/main/:id',              'main.itemInfo')


	        .segment('main', {
	            templateUrl: 'js/views/main.html',
	            controller: 'MainCtrl',
	            resolve: {
	            	initialData: ['initialDataFactory', function(initialDataFactory) {
			            return initialDataFactory.getReceipes();
			        }]
	            },
		        untilResolved: {
		          templateUrl: 'js/views/loading.html'
		        },
		        resolveFailed: {
		          templateUrl: 'js/views/error.html'
		        }}).

		        within().

			        segment('mainPage', {
			            default: true,
			            templateUrl: 'js/views/mainPage.html'}).

			        segment('allReceipes', {
			            templateUrl: 'js/views/allReceipes.html',
			           	resolve: {
			            	initialData: ['initialDataFactory', function(initialDataFactory) {
					            return initialDataFactory.getReceipes();
					        }]
			            },
			            controller: 'allReceipesCtrl'}).

			        segment('addRecipe', {
			            templateUrl: 'js/views/addRecipe.html'}).

			        segment('itemInfo', {
			            templateUrl: 'js/views/itemInfo.html',
			            resolve: {
			            	initialData: ['initialDataFactory', '$routeParams',
			            		function(initialDataFactory, $routeParams) {
					            	return initialDataFactory.getReceipe($routeParams.id);
					        	}
					        ]
			            },
			            controller: 'ReceipeCtrl',
			        	dependencies: ['id']});


	    $routeProvider.otherwise({redirectTo: '/main'});
	    $translateProvider.preferredLanguage('en');
	}]);

}());