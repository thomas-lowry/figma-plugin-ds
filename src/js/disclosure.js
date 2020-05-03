(function(){

	'use strict';

    const disclosureSelector = 'disclosure';

    //PRIVATE
    const disclosureHandler = function(event) {
        let disclosureSet = this.parentNode.parentNode;
        let disclosuresInSet = disclosureSet.querySelectorAll('li');
        let alreadyActive = this.parentNode.classList.contains(disclosureSelector + '--expanded');

        disclosuresInSet.forEach((disclosure) => {
            disclosure.classList.remove(disclosureSelector + '--expanded');
        });

        this.parentNode.classList.add(disclosureSelector + '--expanded');

        if (alreadyActive) {
            this.parentNode.classList.remove(disclosureSelector + '--expanded');
        }

    }

    //PUBLIC
    window.disclosure = {

        init: function() {

            let disclosures = document.querySelectorAll('.' + disclosureSelector + '__label');

            if (disclosures) {
                disclosures.forEach(disclosure => {
                    disclosure.addEventListener('click', disclosureHandler, false);
                });
            }

        },

        destroy: function() {
            
            let disclosures = document.querySelectorAll('.' + disclosureSelector + '__label');

            if (disclosures) {
                disclosures.forEach((disclosure) => {
                    disclosure.removeEventListener('click', disclosureHandler, false);
                });
            }
        }
    };
})();

