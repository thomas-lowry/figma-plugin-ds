(function(){

    'use strict';

    // DEFAULT SETTINGS //////////
    var defaults = {
        selector: 'disclosure'
    }

    var selector;

    //PRIVATE FUNCTIONS //////////
    var disclosureHandler = function(event) {
        let disclosureSet = this.parentNode.parentNode;
        let disclosuresInSet = disclosureSet.querySelectorAll('li');
        let alreadyActive = this.parentNode.classList.contains(selector + '--expanded');

        disclosuresInSet.forEach((disclosure) => {
            disclosure.classList.remove(selector + '--expanded');
        });

        this.parentNode.classList.add(selector + '--expanded');

        if (alreadyActive) {
            this.parentNode.classList.remove(selector + '--expanded');
        }
    
    }

    //PUBLIC FUNCTIONS //////////
    window.disclosure = {

        init: function(opts) {
            
            let settings = Object.assign({}, defaults, opts);
            selector = settings.selector;
            let disclosures = document.querySelectorAll('.' + selector + '__label');

            disclosures.forEach((disclosure) => {
                disclosure.addEventListener('click', disclosureHandler, false);
            });

        },

        destroy: function() {
            
            let disclosures = document.querySelectorAll('.' + selector + '__label');

            disclosures.forEach((disclosure) => {
                disclosure.removeEventListener('click', disclosureHandler, false);
            });

        }

    };

})();