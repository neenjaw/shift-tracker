/* eslint-disable */
/* jshint ignore: start */

var CloseNav = function () {
    window.addEventListener('click', function (e) {
        // console.log(e);
        var isClickOutsideOfNav = true;
        var currentElement = e.target;
        var currentLocalName = currentElement.localName;

        while (currentLocalName !== 'body') {
            if (currentLocalName === 'nav') {
                isClickOutsideOfNav = false;
            }

            currentElement = currentElement.parentElement;
            currentLocalName = currentElement.localName;
        }

        if (isClickOutsideOfNav) {
            $('.navbar-collapse').collapse('hide');
        }
    });
};

var AlertCloser = function () {
    var alerts = document.querySelectorAll('div.alert');
    var timeoutStart = 4000;
    var timeoutIncrement = 500;
    var timeout = timeoutStart + timeoutIncrement;

    for (var i = 0; i < alerts.length; i++) {
        var alert = alerts[i];

        setTimeout(() => {
            $(alert).alert('close');
        }, timeout);

        timeout += timeoutIncrement;
    }
};

var AlertSlideCloser = function () {
    // slide close an element
    function slideClose(elem) {
        if (!elem.classList.contains('closable')) {
            console.error('Can\'t close elem:', elem);
            return;
        }

        // Give the element a height to change from
        elem.style.height = elem.scrollHeight + 'px';

        // Set the height to 0
        window.setTimeout(function () {
            elem.style.height = '0';
        }, 1);

        // When the transition is complete, close it
        window.setTimeout(function () {
            $(elem).alert('close');
        }, 350);
    }

    var closableElems = document.querySelectorAll('.closable.not-closed');
    var timeoutStart = 4000;
    var timeoutIncrement = 500;
    var timeout = timeoutStart + timeoutIncrement;

    for (var i = closableElems.length - 1; i >= 0; i--) {
        var closableElem = closableElems[i];

        setTimeout(function() {
            slideClose(closableElem);
        }, timeout);

        timeout += timeoutIncrement;
    }
}

CloseNav();
// AlertCloser();
AlertSlideCloser();