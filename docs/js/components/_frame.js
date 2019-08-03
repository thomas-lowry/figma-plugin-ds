export function frame() {
    let frames = document.querySelectorAll('.section__frame');
    let frameLen = frames.length;

    for (let i = 0; i < frameLen; i++) {

        //create handles
        let topHandles = document.createElement('div');
        let bottomHandles = document.createElement('div');
        topHandles.className = 'section__top'
        bottomHandles.className = 'section__bottom'

        //add elements into frame
        frames[i].insertAdjacentElement('afterbegin', topHandles);
        frames[i].insertAdjacentElement('beforeend', bottomHandles);

        //modify the pseudo element
        let links = document.getElementsByClassName('layer__link');
        let linksLen = links.length;
        let name = frames[i].parentElement.previousElementSibling.name;

        for (let j = 0; j < linksLen; j++) {
            let linkHref = links[j].getAttribute('href').substring(1);
            if (linkHref == name) {
                let layername = links[j].getElementsByClassName('layer__name')[0].innerHTML;
                frames[i].setAttribute('data-content', layername);
            }

        }

    }

}