export function scroll() {

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
			console.log('del');
		}
	}

}