(function () {

    'use strict';

    /**
    * @ngdoc service
    * @name cookBookApp.initialDataFactory
    * @description
    * # initialDataFactory
    * Factory in the cookBookApp.
    */
    angular.module('cookBookApp').factory('initialDataFactory', initialDataFactory);

    initialDataFactory
        .$inject = [
        'recipeFactory',
        '$q'
    ];

    function initialDataFactory(recipeFactory, $q) {

        /**
        *   Get all receipes
        *   @return {object} promise, all receipes
        */
        function getReceipes(){
            var recipes = recipeFactory.getAllRecipes();

            return $q.all([recipes]).then(function(results){

                // make short description for all receipes table
                angular.forEach(results[0].recipes, function(receipe){
                    receipe.shortText = receipe.description.substr(0, 200);
                });
                return {
                    recipes: results[0],
                };
            });
        }

        /**
        *   Get receipe
        *   @return {object} promise, one receipe
        */
        function getReceipe(receipeId){
            var recipe = recipeFactory.getReceipe(receipeId),
                history = recipeFactory.getReceipeHistory(receipeId);

            return $q.all([recipe, history]).then(function(results){
                return {
                    recipe: results[0],
                    history: recipeFactory.filterHistory(results[1].history, receipeId)
                };
            });
        }

        return {
            getReceipe: getReceipe,
            getReceipes: getReceipes
        };
    }

}());