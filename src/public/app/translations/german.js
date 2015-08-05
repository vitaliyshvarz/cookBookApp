(function() {
    'use strict';
    /*
    *   GER translation
    */
    angular
    .module('cookBookApp')
    .config(["$translateProvider", function ($translateProvider) {

      $translateProvider.translations('de', {
        LANG: 'Sprache',
        BACK: 'ZurÜck',
        RECEIPE: "Rezept",
        HISTORY: "Änderungsverlauf",
        CREATED: "Erstellt",
        UPDATE: "erfrischen",
        DELETE: "löschen",
        MORE: "Mehr",
        EDIT: "bearbeiten",
        RECEIPES: "Rezepte",
        MAIN_PAGE_TITLE: 'Hauptseite cookBookApp',
        BUTTON_LANG_EN: 'englisch',
        BUTTON_LANG_DE: 'deutsch',
        BUTTON_LANG_UK: 'ukrainisch',
        SELECT_FILE: 'Wählen Sie Datei',
        DELETE_IMAGE: 'Bild löschen',
        CANCEL: 'stornieren',
        RECEIPE_ACTIONS: 'receipe Aktionen',
        SUBMIT: 'bestätigen',
        Menu: {
            main_page: 'Hauptseite',
            all_receipes: 'Alle Rezepte',
            add_receipe: 'Neu Rezept hinzufügen'
        },
        Recipe: {
            name: 'Name',
            description: 'Beschreibung',
            image: 'image',
            id: 'id',
            modified: 'modifiziert'
        }
        });
    }]);

})();