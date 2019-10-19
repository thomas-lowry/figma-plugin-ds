(function(){

    'use strict';

    // DEFAULT SETTINGS //////////
    var defaults = {
        selector: '.input-icon'
    }

    //VARIABLES //////////
    var selector;

    //PRIVATE FUNCTIONS //////////
    var inputIconFocusIn = function(event) {
        let iconNode = this.querySelector('.icon');
        iconNode.classList.remove('icon--black-3');
        iconNode.classList.add('icon--blue');
    }

    var inputIconFocusOut = function(event) {
        let iconNode = this.querySelector('.icon');
        iconNode.classList.add('icon--black-3');
        iconNode.classList.remove('icon--blue');
    }

    //PUBLIC FUNCTIONS //////////
    window.iconInput = {

        init: function(opts) {
            let settings = Object.assign({}, defaults, opts);
            selector = settings.selector;
            let elements = document.querySelectorAll(selector);

            //initialize
            elements.forEach(element => {
                element.addEventListener('focusin', inputIconFocusIn, false);
                element.addEventListener('focusout', inputIconFocusOut, false);
            });
        },

        destroy: function() {
            let elements = document.querySelectorAll(selector);

            //initialize
            elements.forEach(element => {
                element.removeEventListener('focusin', inputIconFocusIn, false);
                element.removeEventListener('focusout', inputIconFocusOut, false);
            });

        }

    };

})();