//custom cursors

function cursor(cursorName) {
    let pageContent = document.querySelector('.page-container');

    //cursor
    let moveCursor = 'url("img/cursor-move.svg") 0 0, default';
    let moveCursorWebkit = '-webkit-image-set(url("img/cursor-move1x.png") 1x, url("img/cursor-move2x.png") 2x) 0 0, default';
    let penCursor = 'url("img/cursor-pen.svg") 0 0, default';
    let penCursorWebkit = '-webkit-image-set(url("img/cursor-pen1x.png") 1x, url("img/cursor-pen2x.png") 2x) 0 0, default';
    let defaultCursor = 'default';

    if (cursorName === 'move') {
       pageContent.style.cursor = moveCursor;
        pageContent.style.cursor = moveCursorWebkit;
    } else if (cursorName === 'pen') {
        pageContent.style.cursor = penCursor;
        pageContent.style.cursor = penCursorWebkit;
    } else {
        pageContent.style.cursor = defaultCursor;
    }

    //menu functions
    document.querySelector('.toolbar__button--pen').addEventListener('click', function() {
        removeActive();
        this.classList.add('toolbar__button--active');
        cursor('pen');
    });
    document.querySelector('.toolbar__button--move').addEventListener('click', function() {
        removeActive();
        this.classList.add('toolbar__button--active');
        cursor('move');
    });

    //rmeove active links
    function removeActive() {
        let elements = document.getElementsByClassName('toolbar__button');
        let elementsLen = elements.length;
        for (let i =0; i < elementsLen; i++) {
            elements[i].classList.remove('toolbar__button--active')
        }
    }

}


//Scrolling intersection observer
function scroll() {

	let target = document.querySelector('.intersect');
	let windowHeight = window.innerHeight / 2 - 200;
	windowHeight = windowHeight.toString();
	target.style.top = windowHeight + 'px';

	var windowResize = function() {
		let win = window.innerHeight / 2 - 50;
		win = win.toString();
		target.style.top = win + 'px';
	}

	window.addEventListener('resize', windowResize, false);

	//observe elements
	let sections = document.querySelectorAll('.section__frame');

	//observer options
	let options = {
		element: document.querySelector('.intersect'), // relative to document viewport 
		rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
		threshold: 1// visible amount of item shown in relation to root
	}

	//define observer
	let observer = new IntersectionObserver(intersectionHandler, options);

	function intersectionHandler(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				let section = entry.target.parentNode.previousElementSibling.name;
				window.location.hash = '#' + section;
				highlightNav(section);
				entry.target.classList.add('section__frame--selected');
			} else {
				entry.target.classList.remove('section__frame--selected');
			}
		});
	}

	sections.forEach((section) => observer.observe(section));



	//highlight section on menu
	function highlightNav(sectionName) {

		let layers = document.getElementsByClassName('layers-panel__list')[0];
		let links = layers.getElementsByTagName('A');
		let linksLen = links.length;
		let title = document.querySelector('.toolbar__page');

		removeActiveClass();
		
		for (let i = 0; i < linksLen; i++) {
			let href = links[i].getAttribute('href').substring(1);
			let linkParent = links[i].parentNode.parentNode.classList[0];

			if (href == sectionName && linkParent == 'layers-panel__list') {
				links[i].parentNode.classList.add('layer--selected-nested');
				let nestedRow = links[i].getElementsByClassName('layer__row')[0];
				nestedRow.classList.add('layer--selected');

				//set page title
				let name = nestedRow.querySelector('.layer__name').innerHTML;
				title.innerHTML = name;

			} else if (href == sectionName) {
				links[i].parentNode.classList.add('layer--selected');

				//set page title
				let name = links[i].querySelector('.layer__name').innerHTML;
				title.innerHTML = name;
			}

		}
	  }

	//remove the active classes on menus
	function removeActiveClass() {
		let elements = document.querySelectorAll('.layer--selected,.layer--selected-nested');
		let elementsLen = elements.length;

		for (let i = 0; i < elementsLen; i++) {
			elements[i].classList.remove('layer--selected');
			elements[i].classList.remove('layer--selected-nested');
		}
	}
}


//layers sidebar function
function layers() {

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


//frame functions
function frame() {
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


//initiate functions functions
layers();
frame();
scroll();
cursor('move');

//highlight code
hljs.initHighlightingOnLoad();