(function() {
    'use strict';
    /*
    *   ENG translation
    */
    angular
    .module('cookBookApp')
    .config(["$translateProvider", function ($translateProvider) {

      $translateProvider.translations('en', {
        LANG: 'Language',
        BACK: "Back",
        RECEIPE: "Receipe",
        HISTORY: "History",
        CREATED: "Created",
        UPDATE: "Update",
        DELETE: "Delete",
        MORE: "More",
        EDIT: "Edit",
        RECEIPES: "Receipes",
        MAIN_PAGE_TITLE: 'Main page cookBookApp',
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_DE: 'german',
        BUTTON_LANG_UK: 'ukrainian',
        SELECT_FILE: 'Select File',
        DELETE_IMAGE: 'delete Image',
        CANCEL: 'Cancel',
        RECEIPE_ACTIONS: 'Receipe actions',
        SUBMIT: 'submit',
        Menu: {
            main_page: 'Main page',
            all_receipes: 'All receipes',
            add_receipe: 'Add receipe'
        },
        Recipe: {
            name: 'name',
            description: 'description',
            image: 'photo',
            id: 'id',
            modified: 'modified'
        }
      });
    }]);

})();