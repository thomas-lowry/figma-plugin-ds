export function layers() {

    //variables
    var layersPanel = document.querySelectorAll('.layers-panel')[0];
    var layersChevrons = Array.from(document.getElementsByClassName('layer__chevron'));
    var layers = document.getElementsByClassName('layer');
    
    // Chevron Functions

        //show/hide functions
        var showChevron = function() {
            layersChevrons.forEach(element => {
                element.style.opacity = 1.0;
            });
        }
        var hideChevron = function() {
            layersChevrons.forEach(element => {
                element.style.opacity = 0;
            });
        }

        //add event listeners
        layersPanel.addEventListener('mouseover', showChevron, false);
        layersPanel.addEventListener('mouseout', hideChevron, false);
    
    //Expand/collapse
    var layersLen = layers.length;
    for (let i = 0; i < layersLen; i++) {
        let row = layers[i].getElementsByClassName('layer__row')[0];
        let nested = layers[i].getElementsByClassName('layer__nested-layers')[0];

        if (nested) {
            let chevron = row.getElementsByClassName('layer__chevron')[0];
            chevron.addEventListener('click', function() {
                nested.classList.toggle('layer--nested-hidden');
            });
        }
    }


    
}