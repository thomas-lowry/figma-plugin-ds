(function(){

	'use strict';

	// DEFAULT SETTINGS //////////
	var defaults = {
		selector: 'select-menu',
		position: 'under'
	}
	//position options
	// 'positionToSelected' = open menu to selected item
	// 'under' opens drop down below select menu
	// 'overlap' opens dropdown menu with first menu item overlapping select menu

	// VARIABLES /////////////
	var settings, selector, targets, optionList, selectedItem, itemHeight;

	var init = false;

	//PRIVATE FUNCTIONS //////////

	//create the select menus
	function createMenus() {

		let targetLen = targets.length;
		for (let i = 0; i < targetLen; i++) {

			//create menu element wrapper + ul + button + hide select menu
			createWrapper(document.createElement('div'), i);
			
			let optionGroups = targets[i].getElementsByTagName('optgroup');
            selectedItem = targets[i].selectedIndex;
			itemHeight = 0;

			//create option groups if they are present else create normal list items
			if (optionGroups.length != 0) {
				//yes there are option groups

				//determine if option groups have labels present
                let hasLabels;
                if (!optionGroups[0].label) {
                    hasLabels =  false;
                } else {
                    hasLabels =  true;
				}

				//loop through option groups
				for (let k = 0; k < optionGroups.length; k++) {

					//get children of option groups
					let optionGroupChildren = optionGroups[k].getElementsByTagName('option');
					
					//create divider element
					let divider = document.createElement('div');
					divider.className = selector + '__divider';

					// if labels are present, put them before the list item
                    // otherwise put a divider after (unless it is the last item)
                    if (hasLabels == true) {
					
						//create divider
                        let dividerLabel = document.createElement('span');
                        let labelText = document.createTextNode(optionGroups[k].label);
						dividerLabel.className = selector + '__divider-label';
						
						if (k === 0) {
							dividerLabel.classList.add(selector + '__divider-label--first');
						}

                        dividerLabel.appendChild(labelText);
                        divider.appendChild(dividerLabel);
						optionList.appendChild(divider);

						//calculate height of divider
						addItemHeight(dividerLabel);

						// create the list item
                        for (let j = 0; j < optionGroupChildren.length; j++) {
                            createListItem(optionGroupChildren[j]);
                        }

					} else {

						// create the list item 
                        for (let j = 0; j < optionGroupChildren.length; j++) {
                            createListItem(optionGroupChildren[j]);
						}
						
						if (k != optionGroups.length-1) {
                            //create line
                            let dividerLine = document.createElement('span');
                            dividerLine.className = selector + '__divider-line';
                            divider.appendChild(dividerLine);
                            optionList.appendChild(divider);

                            //calculate height of item to offset menu items
                            addItemHeight(dividerLine);
                            
                        }

					}

					//prevent clicks on optgroup dividers					
					divider.addEventListener('click', stopProp, false);

				}

			} else {
				//no there are no option groups

				//create select items (no groups)
                for (let k = 0; k < targets[i].length; k++) {
                    //console.log(objectData.elements[i].options[k]);
                    createListItem(targets[i].options[k]);
                }

			}

		}

	}

	//create wrapper element
	function createWrapper(selectWrapper, count) {
		let element = targets[count];

        //handle the select menu
		element.style.display = 'none'; //hide the select menu
		
		//set the selected option to the correct element if not set
        element.options[element.selectedIndex].selected = true;


        //create the div wrapper
        element.parentNode.insertBefore(selectWrapper, element);
        selectWrapper.appendChild(element);
        selectWrapper.className = selector;

        //create the new button element
        let selectButton = document.createElement('button');
        let selectButtonLabel = document.createElement('span');
        let selectButtonIcon = document.createElement('span');
		optionList = document.createElement('ul');
		
		//determine button label
        let selectButtonLabelText;
        if (element.selectedIndex == 0) {
            selectButtonLabelText = document.createTextNode(element.options[0].text);
        } else {
            let index = element.selectedIndex;
            selectButtonLabelText = document.createTextNode(element.options[index].text);
		}

		//assign class names
        selectButton.className = selector + '__button';
        selectButtonLabel.className = selector + '__button-label';
        selectButtonIcon.className = selector + '__icon';
		optionList.className = selector + '__list';
		
		//add button to dom
        selectWrapper.appendChild(selectButton);
        selectWrapper.appendChild(optionList);
        selectButton.appendChild(selectButtonLabel);
        selectButton.appendChild(selectButtonIcon);
		selectButtonLabel.appendChild(selectButtonLabelText);
		
		//overlap the position of the menu if setting selected
        if (settings.position == 'overlap') {
            optionList.style.top = 0;
		}
		
		//add event listener		
		selectButton.addEventListener('click', displayMenu, false);
	}

	//create list item
	function createListItem(item) {
		if (item.value != "") {
			let listItem =  document.createElement("li");
			let listIcon = document.createElement("span");
			let listText= document.createElement("span");

			listItem.className = selector + '__list-item';
			listIcon.className = selector + '__list-item-icon';
			listText.className = selector + '__list-item-text';
			
            listItem.setAttribute('data-value', item.value);
            listText.innerHTML +=item.text;
			
			listItem.appendChild(listIcon);
			listItem.appendChild(listText);
            optionList.appendChild(listItem);

            //add data attributes to item if positionToSelection is set
            if (settings.position == 'positionToSelection') {
                listItem.setAttribute('position', itemHeight);
                addItemHeight(listItem);
            }

            //if item is selected, add active class
            if (item.index == selectedItem) {
                listItem.classList.add(selector + '__list-item--active');
                
                if (settings.position == 'positionToSelection') {
                    let menuPosition = -Math.abs(parseInt(listItem.getAttribute('position')));
                    optionList.style.top = menuPosition + 'px';
                }
                
            }

			//event listener			
			listItem.addEventListener('click', displayMenu, false);
        }

	}

	//function display menu
	var displayMenu = function(event) {

		let element = this;

		//determine if the the menu button or item is clicked
        if (element.tagName == 'BUTTON') {

			this.classList.toggle(selector + '__button--active');

            //toggle the dropdown
            let dropdown = element.parentNode.querySelector('UL');
            dropdown.classList.toggle(selector + '__list--active');

        } else if (element.tagName == 'LI') {
			
            let dropdown = element.parentNode.parentNode.querySelector('UL');

            //remove active classses from all menus
            let listItems = dropdown.getElementsByTagName('LI');
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].classList.remove(selector + '__list-item--active');
            }

            //add active class
            element.classList.add(selector + '__list-item--active');

            //update the value of the select menu
            let select = dropdown.parentNode.querySelector('SELECT');
			let selectedValue = element.getAttribute('data-value');
			let selectItems = select.querySelectorAll('option');
			let selectItemsLen = selectItems.length;
			let event = new Event('change');
			select.dispatchEvent(event);

			selectItems.forEach((item) => {
				item.removeAttribute("selected");
			});

			select.value = selectedValue;

			for (let i = 0; i < selectItemsLen; i++) {
				let value = selectItems[i].value;
				if (value == selectedValue) {
					selectItems[i].setAttribute('selected','selected')
				}
			}


			//update the dropdown button
			let button = element.parentNode.parentNode.querySelector('BUTTON');
			let buttonLabel = button.querySelector('.' + selector + '__button-label');
			buttonLabel.textContent = element.textContent;
			button.classList.toggle(selector + '__button--active');

            //toggle the dropdown
            dropdown.classList.toggle(selector + '__list--active');

            if (settings.position == 'positionToSelection') {
                let menuPosition = -Math.abs(parseInt(element.getAttribute('position')));
                element.parentNode.style.top = menuPosition + 'px';
            }

        }

	}

	//EVENT HANDLERS //////////

	//stop event propagation
	var stopProp = function(event) {
		event.stopPropagation();
	}

	//track clicks outside the menu
	var isOutside = function(event) {
		let menus = document.querySelectorAll('select.' + selector);

		menus.forEach((menu) => {
			let parent = menu.parentNode;
			let menuList = parent.querySelector('UL');
			let button = parent.querySelector('BUTTON');

			if (menuList.classList.contains(selector + '__list--active')) {
				let clickInside = parent.contains(event.target);
				if (!clickInside) {
					menuList.classList.remove(selector + '__list--active');
					button.classList.remove(selector + '__button--active');
				}
			}
		});
	}


	//HELPER FUNCTIONS //////////
	
	//increment itemHeight
    function addItemHeight(element) {

        //get key dimensions to calculate height
        let dimensions = [
            parseInt(window.getComputedStyle(element, null).getPropertyValue('margin-top')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('margin-bottom')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-top')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-bottom')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('height')),
        ];
        itemHeight += arraySum(dimensions);
    }

    //helper function to return sum of array
    function arraySum(data) {
        return data.reduce(function(a,b){
            return a + b
        }, 0);
    }


	// PUBLIC FUNCTIONS /////////////
	window.selectMenu = {

		init: function(opts) {

			if (init == true) {
				selectMenu.destroy();
			}

			settings = Object.assign({}, defaults, opts);
			selector = settings.selector;
			targets = document.querySelectorAll('.' + selector);

			createMenus();

			//click handler for clicks outside of menu
			document.addEventListener('click', isOutside, false);

			init = true;
		},

		destroy: function() {

			//destroy the elements
			let selectMenus = document.querySelectorAll('select.' + selector);
			
			selectMenus.forEach((menu) => {

				let parent = menu.parentNode;
				let button = parent.querySelector('BUTTON');
				let menuList = parent.querySelector('UL');

				button.remove();
				menuList.remove();

				parent.outerHTML = parent.innerHTML;

			});

			//remove event handler
			document.removeEventListener('click', isOutside, false);

			init = false;
		}

	}

})();