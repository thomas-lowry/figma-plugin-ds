export function cursor(cursorName) {
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