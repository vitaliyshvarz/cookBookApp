(function() {
    'use strict';
    /*
    *   UK translation
    */
    angular
    .module('cookBookApp')
    .config(["$translateProvider", function ($translateProvider) {

      $translateProvider.translations('uk', {
        LANG: 'Мова',
        BACK: 'Назад',
        RECEIPE: "Рецепт",
        HISTORY: "Історія змін",
        CREATED: "Створений",
        UPDATE: "Оновити",
        DELETE: "видалити",
        MORE: "Більше",
        EDIT: "Редагувати",
        RECEIPES: "Рецепти",
        MAIN_PAGE_TITLE: 'Головна cookBookApp',
        BUTTON_LANG_EN: 'англійська',
        BUTTON_LANG_DE: 'німецька',
        BUTTON_LANG_UK: 'українська',
        SELECT_FILE: 'Обрати файл',
        DELETE_IMAGE: 'Видалити зображення',
        CANCEL: 'відміна',
        RECEIPE_ACTIONS: 'Операції з рецептом',
        SUBMIT: 'підтвердити',
        Menu: {
            main_page: 'Головна сторінка',
            all_receipes: 'Усі рецепти',
            add_receipe: 'Додати рецепт'
        },
        Recipe: {
            name: 'назва',
            image: 'фото',
            description: 'опис',
            id: 'id',
            modified: 'змінений'
        }
      });

    }]);

})();