(function(){

	'use strict';

    const selectMenuSelector = 'select-menu';

    let elements, optionList, itemHeight, selectedItem;
    let init = false;

    //PRIVATE

    //create the menus
    const createMenus = function() {

        // loop through all select menus on screen
        elements.forEach(function (menu, index) {

            //  setup mutation observer
            let mutationConfig = { attributes: true, childList: true, subtree: true };
            let callback = function(mutationsList, observer) {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        selectMenu.init();
                    } else if (mutation.type === 'attributes') {
                        if (mutation.attributeName === 'value' || mutation.attributeName === 'disabled') {
                            selectMenu.init();
                        }
                    }
                }
            };
            let observer = new MutationObserver(callback);
            observer.observe(menu, mutationConfig);


            //keep track of menu height, reset to 0 when building new one
            itemHeight = 0;
        
            //create the wrapper for the menu
            createWrapper(menu);

            //find out if an item is already selected
            selectedItem = menu.selectedIndex;

            //find out if there are option groups present
            let optionGroups = Array.from(menu.getElementsByTagName('optgroup'));
        
            if (optionGroups.length != 0) { //do this if optgroups present
                
                //determine if the option groups have labels
                let hasLabels = (optionGroups[0].label) ? true : false;

                //loop through every option group
                optionGroups.forEach(function (group, index) {

                    if (hasLabels) {

                        if (index != 0) {
                            let divider = document.createElement('div');
                            divider.className = selectMenuSelector + '__divider';
                            optionList.appendChild(divider);
                            addItemHeight(divider);

                            //prevent clicks on optgroup dividers					
                            divider.addEventListener('click', stopProp, false);
                        }

                        //create the divider element w/ a label
                        let divider = document.createElement('div');
                        divider.textContent = group.label
                        divider.className = selectMenuSelector + '__divider-label';
                        
                        //add to menu
                        optionList.appendChild(divider);

                        //calculate and add height of divider
                        addItemHeight(divider);

                        //prevent clicks on optgroup dividers					
                        divider.addEventListener('click', stopProp, false);
                    }

                    if (index > 0 && !hasLabels) {
                        //create the divider element
                        let divider = document.createElement('div');
                        divider.className = selectMenuSelector + '__divider';

                        //add to menu
                        optionList.appendChild(divider);

                        //calculate and add height of divider
                        addItemHeight(divider);

                        //prevent clicks on optgroup dividers					
                        divider.addEventListener('click', stopProp, false);
                    }
                    
                    //get children of group
                    let options = Array.from(group.getElementsByTagName('option'));
                    
                    //loop through all options and generate an item
                    options.forEach(option => {
                        createMenuItem(option);
                    });

                });


            } else { //do this if there are no optgroupss

                let options = Array.from(menu.options)
                //loop through all options and generate an item
                options.forEach(option => {
                    createMenuItem(option);
                });
            }
        });
    }

    //create the wrapper for the select menu
    //includes button and generates the wrapper UL for the list of menu items
    const createWrapper = function(menu) {

        //add top margin
        itemHeight += 6;

        //hide the select menu
        menu.style.display = 'none';
        
        //set the selected option to correct menu item if not set

        if (menu.selectedIndex != -1) {
            menu.options[menu.selectedIndex].selected = true;
        }

        //create the wrapper, and insert the hidden select menu
        let menuWrapper = document.createElement('div');
        menuWrapper.className = selectMenuSelector;
        menu.parentNode.insertBefore(menuWrapper, menu);
        menuWrapper.appendChild(menu);

        //determine if an icon is specified
        let iconName = menu.getAttribute('icon');

        //create the button + nested elements
        let button = document.createElement('button')
        let icon;
        let buttonLabel = document.createElement('span')
        let buttonCaret = document.createElement('span')
        if (iconName) { 
            icon = document.createElement('span')
            icon.className = 'icon ' + iconName; 
        }
        
        //add classes
        button.className = selectMenuSelector + '__button';
        buttonLabel.className = selectMenuSelector + '__label';
        buttonCaret.className = selectMenuSelector + '__caret';

        //add content
        if (menu.selectedIndex != -1) {
            buttonLabel.textContent = menu.options[menu.selectedIndex].text;
            if (menu.options[menu.selectedIndex].value === '') {
                buttonLabel.classList.add(selectMenuSelector + '__label--placeholder');
            }
        } else {
            buttonLabel.textContent = 'No items to display';
            buttonLabel.classList.add(selectMenuSelector + '__label--placeholder');
        }


        //create the menu container
        optionList = document.createElement('ul');
        optionList.className = selectMenuSelector + '__menu';

        //add elements to dom
        menuWrapper.appendChild(button);
        menuWrapper.appendChild(optionList);
        if (icon) { 
            button.appendChild(icon); 
        }
        button.appendChild(buttonLabel);
        button.appendChild(buttonCaret);

        //add event listener		
        button.addEventListener('click', displayMenu, false);
    }

    //create a list item
    const createMenuItem = function(menuItem) {

        /* only create an item if there is a value this will ignore 
        the first menu item (if included) as a placeholder */
        if (menuItem.hasAttribute('value') && menuItem.value != '') {

            //create list item elements
            let item =  document.createElement('li');
            let itemIcon = document.createElement('span');
            let itemLabel= document.createElement('span')

            //set classnames
            item.className = selectMenuSelector + '__item';
            itemIcon.className = selectMenuSelector + '__item-icon';
            itemLabel.className = selectMenuSelector + '__item-label';

            //add elements to dom
            item.appendChild(itemIcon);
            item.appendChild(itemLabel);
            optionList.appendChild(item);

            //configure attributes
            item.setAttribute('data-value', menuItem.value);
            itemLabel.textContent = menuItem.text;
            item.setAttribute('position', itemHeight);

            /* after the item is created we pass this element to this function
            this function calculates the height of the item and increases value
            of the item height var */
            addItemHeight(item);

            //if item is selected, add active class
            if (menuItem.index === selectedItem) {
                item.classList.add(selectMenuSelector + '__item--selected');
                let menuPosition = -Math.abs(parseInt(item.getAttribute('position')));
                optionList.style.top = menuPosition + 'px';
            }

            //event listener			
            item.addEventListener('click', displayMenu, false);
        }
    }

    //function to display the menu when clicked
    var displayMenu = function(event) {

        /*the event is any click registered inside the element
        and then determine if the button or menu item is clicked */
        if (this.tagName == 'BUTTON') {

            //get the menu element so we can see if there are options to display
            let selectMenu = this.parentNode.querySelector('select');

            if (selectMenu.children.length > 0) {

                //add active class to button (is this needed?)
                this.classList.toggle(selectMenuSelector + '__button--active');

                //toggle the menu
                let menu = this.parentNode.querySelector('UL');
                menu.classList.toggle(selectMenuSelector + '__menu--active');

                //update position of menu
                resizeAndPosition(menu);
            }

            this.blur();

        } else if (this.tagName === 'LI') {

            //define the menu
            let menu = this.parentNode.parentNode.querySelector('UL');

            //remove active classses from all menus
            let menuItems = Array.from(menu.getElementsByTagName('LI'));
            menuItems.forEach(item => {
                item.classList.remove(selectMenuSelector + '__item--selected');
            });

            //select item
            this.classList.add(selectMenuSelector + '__item--selected');

            //update the value of the select menu
            let select = menu.parentNode.querySelector('SELECT');
            let selectedValue = this.getAttribute('data-value');
            let options = select.querySelectorAll('option');
            
            //remove selected option for all elements
            options.forEach(option => {
                if (option.value === selectedValue) {
                    option.setAttribute('selected','selected');
                } else {
                    option.removeAttribute('selected');
                }
            });
            select.value = selectedValue;
            
            //dispatch change event
            let event = new Event('change');
            select.dispatchEvent(event);

            //update the button on the dropdown
            let button = this.parentNode.parentNode.querySelector('BUTTON');
            let buttonLabel = button.querySelector('.' + selectMenuSelector + '__label');
            buttonLabel.textContent = this.textContent;
            buttonLabel.classList.remove(selectMenuSelector + '__label--placeholder');

            button.classList.toggle(selectMenuSelector + '__button--active');

            //toggle the dropdown visibility
            menu.classList.toggle(selectMenuSelector + '__menu--active');

            //update the position of the drop down after hidden
            let menuPosition = -Math.abs(parseInt(this.getAttribute('position')));
            menu.style.top = menuPosition + 'px';

            //update position of menu
            resizeAndPosition(menu);
        }
    }

    // event handlers

    //stop event propagation
    var stopProp = function(event) {
        event.stopPropagation();
    }

    //track clicks outside the menu
    var isOutside = function(event) {
        let selectMenus = document.querySelectorAll('select.' + selectMenuSelector);

        selectMenus.forEach(select => {
            let menuWrapper = select.parentNode;
            let menu = menuWrapper.querySelector('UL');
            let button = menuWrapper.querySelector('BUTTON');

            if (menu.classList.contains(selectMenuSelector + '__menu--active')) {
                let clickInside = menuWrapper.contains(event.target);
                if (!clickInside) {
                    menu.classList.remove(selectMenuSelector + '__menu--active');
                    button.classList.remove(selectMenuSelector + '__button--active');
                }
            }
        });
    }

    // this function ensures that the select menu
    // fits inside the plugin viewport
    // if its too big, it will resize it and enable a scrollbar
    // if its off screen it will shift the position
    const resizeAndPosition = function(menu) {

        //set the max height of the menu based on plugin/iframe window
        let maxMenuHeight = window.innerHeight - 16;
        let menuHeight = menu.offsetHeight;
        let menuResized = false;
        let menuButton = menu.parentNode.querySelector('BUTTON');

        if (menuHeight > maxMenuHeight) {
            menu.style.height = maxMenuHeight + 'px';
            menuResized = true;
        }

        //lets adjust the position of the menu if its cut off from viewport
        let bounding = menu.getBoundingClientRect();
        let parentBounding = menuButton.getBoundingClientRect();

        if (bounding.top < 0) {
            menu.style.top = -Math.abs(parentBounding.top - 8) + 'px';
        }
        if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
            let minTop = -Math.abs(parentBounding.top - (window.innerHeight - menuHeight - 8));
            let newTop = -Math.abs(bounding.bottom - window.innerHeight + 16);
            if (menuResized) {
                menu.style.top = -Math.abs(parentBounding.top - 8) + 'px'; 
            } else if (newTop > minTop) {
                menu.style.top = minTop + 'px';
            } else {
                menu.style.top = newTop + 'px';
            }    
        }
    }


    //helper functions

    //increment itemHeight
    function addItemHeight(element) {

        //get key dimensions to calculate height
        let dimensions = [
            parseInt(window.getComputedStyle(element, null).getPropertyValue('margin-top')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('margin-bottom')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-top')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-bottom')),
            parseInt(window.getComputedStyle(element, null).getPropertyValue('height'))
        ];

        itemHeight += arraySum(dimensions);
        
    }
    //helper function to return sum of array
    function arraySum(data) {
        return data.reduce(function(a,b){
            return a + b
        }, 0);
    }


    // PUBLIC
    window.selectMenu = {

        init: function() {

            //destroy first if already initialized
            if (init == true) {
                this.destroy();
            }

            //initialize all menus
            elements = document.querySelectorAll('.' + selectMenuSelector);

            if (elements) {
                //create the menu(s)
                createMenus();

                //click handler for clicks outside of menu
                document.addEventListener('click', isOutside, false);
            
                //set init to true now that menu has been initialized
                init = true;

            }

        },

        destroy: function() {

            if (elements) {
                //remove all the generated DOM elements
                elements.forEach((menu) => {

                    let parent = menu.parentNode;
                    parent.querySelector('BUTTON').remove();
                    parent.querySelector('UL').remove();
                    parent.outerHTML = parent.innerHTML;

                });

                //remove event handler on each element
                document.removeEventListener('click', isOutside, false);

                //set init to false now that menu has been destroyed
                init = false;
            }
        }
    }
})();
