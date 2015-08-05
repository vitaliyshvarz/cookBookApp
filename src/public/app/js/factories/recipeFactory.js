(function () {
    'use strict';

    /**
    * @ngdoc service
    * @name cookBookApp.recipeFactory
    * @description
    * # recipeFactory
    * Factory in the cookBookApp.
    */
    angular.module('cookBookApp').factory('recipeFactory', recipeFactory);

    recipeFactory
        .$inject = [
        'recipeService',
        '$q',
        'ngDialog',
        '$location',
        'Upload',
        'RECIPE_PHOTO_UPLOAD',
        'oneRecipeService',
        'recipeHistoryService',
        'deleteFile',
        'updateRecipeService'
    ];

    function recipeFactory(recipeService, $q, ngDialog, $location, Upload, RECIPE_PHOTO_UPLOAD, oneRecipeService, recipeHistoryService, deleteFile, updateRecipeService) {

        /**
        * Returns all recipes
        * @return{object} promise
        */
        var getAllRecipes = function() {
            var _deferred = $q.defer();
            recipeService.query({}).$promise.then(
                function(result) {
                    _deferred.resolve(result);
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * Returns receipe
        * @params{string} receipe id
        */
        var getReceipe = function(id){
            var _deferred = $q.defer();
            oneRecipeService.query({'id': id}).$promise.then(
                function(result) {
                    _deferred.resolve(result);
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * Returns receipe history
        * @params{string} receipe history
        */
        var getReceipeHistory = function(){
            var _deferred = $q.defer();
            recipeHistoryService.query({}).$promise.then(
                function(result) {
                    _deferred.resolve(result);
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * add Receipe History image
        * @params{object} receipe object to add
        */
        var addReceipeHistory = function(recipe){
            var _deferred = $q.defer(),
                recipeHistoryItem = recipe;
                recipeHistoryItem.recId = recipe._id;
            recipeHistoryService.post(recipeHistoryItem).$promise.then(
                function(result) {
                    _deferred.resolve(result);
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * Delete image
        * @params{string} -file link
        */
        var deleteImage = function(file){
            var _deferred = $q.defer();
            deleteFile.post({file : file}).$promise.then(
                function(result) {
                    _deferred.resolve(result);
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * Update recipe
        * @params{object} - recipe data
        */
        var updateReceipe = function(receipe){
            var _deferred = $q.defer();
            updateRecipeService.post(receipe).$promise.then(
                function(result) {
                    addReceipeHistory(result.receipe).then(function(){
                        _deferred.resolve(result);
                        showMessage("Receipe Updated");
                    }, function(error) {
                        _deferred.reject( error );
                    });
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * Add new recipe
        * @params{object} - recipe data
        */
        var addNewReceipe = function(recipe) {
            var _deferred = $q.defer();
            recipeService.post(recipe).$promise.then(
                function(result) {
                    showMessage("Receipe added");
                    _deferred.resolve(result);
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * Delete recipe
        * @params{string} - recipe id
        */
        var deleteReceipe = function(id){
            var _deferred = $q.defer();
            recipeService.delete({id: id}).$promise.then(
                function(result) {
                    showMessage("Receipe deleted");
                    _deferred.resolve(result);
                },
                function(error) {
                    _deferred.reject( error );
                });
            return _deferred.promise;
        };

        /**
        * upload Image
        * @params{object} - file
        */
        var uploadImage = function(file){
            Upload.upload({
                url: RECIPE_PHOTO_UPLOAD,
                file: file,
                fields: {
                    'username': 'app',
                    'extention': file.name.split('.').pop()
                },
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' +
                          evt.config.file.name + '\n');
            }).success(function (data, status, headers, config) {
                console.log('file: ' + config.file.name + ', Response: ' +
                JSON.stringify(data) + '\n');
            });
        };

        /**
        * Filteres history by id
        * @params{object} - history items
        * @params{string} - active receipe id
        * @return{array} -  active receipe history items
        */
        var filterHistory = function(history, id){
            var filteredHistory = [];
            angular.forEach(history, function(hisItem){
                if(hisItem.recId === id){ filteredHistory.push(hisItem); }
            });
            return filteredHistory;
        };

        /**
        * Show dialog message
        * @params{string} - message
        */
        function showMessage(message){
            ngDialog.open({ template: 'js/views/popupTmpl.html' ,
                controller: ['$scope', function($scope, otherService) {
                $scope.message = message;
                }]
            });
        }

        return {
            getAllRecipes : getAllRecipes,
            addNewReceipe  : addNewReceipe,
            uploadImage: uploadImage,
            getReceipe: getReceipe,
            getReceipeHistory: getReceipeHistory,
            deleteImage: deleteImage,
            updateReceipe: updateReceipe,
            deleteReceipe: deleteReceipe,
            filterHistory: filterHistory
        };
    }

}());