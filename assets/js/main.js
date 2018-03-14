/* eslint-disable */
/* jshint ignore: start */

var CloseNav = (function () {
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
}());

var AlertSlideCloser = (function () {
    // slide close an element
    function slideClose(elem) {
        if (!elem.classList.contains('closable')) {
            console.error('Can\'t close elem:', elem);
            return;
        }

        elem.style.height = elem.scrollHeight + 'px';

        elem.classList.remove('not-closed');
        elem.classList.add('closing');

        // Set the height to 1px
        window.setTimeout(function () {
            elem.style.height = '0';
        }, 1);

        // When the transition is complete, delete it
        window.setTimeout(function () {
            elem.parentNode.removeChild(elem);
        }, 350);
    }

    function afterTimeoutSlideClose(elem, timeout) {
        setTimeout(function () {
            slideClose(elem);
        }, timeout);
    }

    var closableElems = document.querySelectorAll('.closable.not-closed');
    var timeoutStart = 4000;
    var timeoutIncrement = 500;
    var timeout = timeoutStart + timeoutIncrement;

    for (var i = closableElems.length - 1; i >= 0; i--) {
        var closableElem = closableElems[i];

        console.log(closableElem);
        
        afterTimeoutSlideClose(closableElem, timeout);

        timeout += timeoutIncrement;
    }

    return {
        slideClose: slideClose
    };
}());

var Flash = (function() {
    var alertContainer = document.querySelector('.alert-container');
    var alertTypes = ['primary' , 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

    function insertFlash(type, message) {
        var alertType;

        if (alertTypes.includes(type)) {
            alertType = type;
        } else {
            alertType = 'primary';
        }

        //make the new element
        var newAlert = document.createElement('div');
        //set set classes / content
        newAlert.classList.add('alert', 'alert-'+alertType, 'closable', 'not-closed');
        newAlert.innerHTML = message;
        //add it to the DOM
        alertContainer.appendChild(newAlert);
        //scroll to show the flash
        newAlert.scrollIntoView();

        //setTimeout to close it after 4s
        setTimeout(function () {
            AlertSlideCloser.slideClose(newAlert);
        }, 4000);
    }

    return {
        insertFlash: insertFlash
    };
}());