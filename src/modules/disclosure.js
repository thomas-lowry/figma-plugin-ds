const selector = 'disclosure';

//PRIVATE
const disclosureHandler = function(event) {
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

//PUBLIC
const disclosure = {

    init: function() {

        let disclosures = document.querySelectorAll('.' + selector + '__label');

        if (disclosures) {
            disclosures.forEach(disclosure => {
                disclosure.addEventListener('click', disclosureHandler, false);
            });
        }

    },

    destroy: function() {
        
        let disclosures = document.querySelectorAll('.' + selector + '__label');

        if (disclosures) {
            disclosures.forEach((disclosure) => {
                disclosure.removeEventListener('click', disclosureHandler, false);
            });
        }


    }
};

export default disclosure;

