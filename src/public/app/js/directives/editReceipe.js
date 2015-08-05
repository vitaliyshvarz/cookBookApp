(function() {
    'use strict';
    /*
    *	Add new receipe directive
    *
    */
    angular
        .module('cookBookApp')
        .directive('editReceipe', editReceipe);

    editReceipe
        .$inject = [
        'recipeFactory',
        '$translate',
        '$routeSegment',
        '$timeout',
        '$location'
    ];

    function editReceipe(recipeFactory, $translate, $routeSegment, $timeout, $location) {
        return {
            restrict: 'E',
            replace: false,
            scope:{
                readyReceipe: '=receipe'
            },
            templateUrl: 'js/directives/editReceipe.html',
            link: function(scope, $timeout) {
                // create receipe object template
            	scope.receipe = {
            		'name': '',
            		'description': '',
            		'role': 'default',
            		'image':''

            	};

            	scope.nameError = false;

                /*
                * Set ready receipe if passed.
                */
                scope.init = function(){
                    if(scope.readyReceipe){
                        scope.receipe = scope.readyReceipe;
                    }
                };

                scope.init();

                /*
                * Reset receipe object.
                */
                scope.resetReceipe = function(){
                    scope.receipe = {
                        'name': '',
                        'description': '',
                        'role': 'default',
                        'image':''
                    };
                    $routeSegment.chain[0].reload();
                };

                /*
                * Check receipe name.
                */
            	scope.checkName = function(){
            		if(!scope.receipe.name){
            			scope.nameErrorErrorText = 'receipe name is required';
            			scope.nameError = true;
            		}else
            		if(!isNaN(scope.receipe.name)){
            			scope.nameErrorErrorText = 'receipe name must be string';
            			scope.nameError = true;
            		} else
            		if(scope.receipe.name.length > 50){
            			scope.nameErrorErrorText = 'receipe name is too long';
            			scope.nameError = true;
            		} else {
            			scope.nameError = false;
            		}
            	};

                /*
                * Check receipe description.
                */
                scope.checkDesc = function(){
                    if(!scope.receipe.description){
                        scope.descriptionErrorText = 'receipe description is required';
                        scope.descriptionError = true;
                    }else
                    if(!isNaN(scope.receipe.description)){
                        scope.descriptionErrorText = 'receipe description must be string';
                        scope.descriptionError = true;
                    } else {
                        scope.descriptionError = false;
                    }
                };

            	/*
            	* Add new receipe.
            	*/
            	scope.addNewReceipe = function(){
                    if(scope.receipe.name && scope.receipe.description) {
                            scope.uploadImage(scope.files);
                            recipeFactory.addNewReceipe(scope.receipe);
                            scope.resetReceipe();
                    }
            	};

                /*
                * remove selected image
                */
                scope.removeImage = function(){
                    scope.files = [];
                };

                /*
                * upload Image image
                * @params{array} files
                */
                scope.uploadImage = function (files) {
                    scope.receipe.image = files[0].name;
                    recipeFactory.uploadImage(files[0]);
                };

                /*
                * delete Image
                */
                scope.deleteImage = function(){
                    recipeFactory.deleteImage(scope.receipe.image);
                    scope.receipe.image = '';
                    scope.readyReceipe.image = '';
                    recipeFactory.updateReceipe(scope.receipe);
                };

                /*
                * update receipe
                */
                scope.updateReceipe = function(){
                    if(scope.files){
                        scope.uploadImage(scope.files);
                    }
                    recipeFactory.updateReceipe(scope.receipe).
                        then(scope.updateLocalReceipe);
                };

                /*
                * update local receipe object
                * @params{object} new receipe object
                */
                scope.updateLocalReceipe = function(receipe){
                    //hide buffered image
                    scope.files[0] = null;
                    scope.receipe.image = receipe.receipe.image;
                };

                /**
                * Delete receipe
                */
                scope.deleteReceipe = function(){
                    recipeFactory.deleteReceipe(scope.receipe._id);
                    scope.resetReceipe();
                };
            }
        };
    }

})();
