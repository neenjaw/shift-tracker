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

var ShowHide = (function() {
    // Show an element
    function show (elem) {

        // Get the natural height of the element
        var getHeight = function () {
            elem.style.display = 'block'; // Make it visible
            var height = elem.scrollHeight + 'px'; // Get it's height
            elem.style.display = ''; //  Hide it again
            return height;
        };

        var height = getHeight(); // Get the natural height
        elem.classList.add('is-visible'); // Make the element visible
        elem.style.height = height; // Update the max-height

        // Once the transition is complete, remove the inline max-height so the content can scale responsively
        window.setTimeout(function () {
            elem.style.height = '';
        }, 350);

    }

    // Hide an element
    function hide (elem) {

        // Give the element a height to change from
        elem.style.height = elem.scrollHeight + 'px';

        // Set the height back to 0
        window.setTimeout(function () {
            elem.style.height = '0';
        }, 1);

        // When the transition is complete, hide it
        window.setTimeout(function () {
            elem.classList.remove('is-visible');
        }, 350);

    }

    // Toggle element visibility
    function toggle (elem, timing) {

        // If the element is visible, hide it
        if (elem.classList.contains('is-visible')) {
            hide(elem);
            return;
        }

        // Otherwise, show it
        show(elem);

    }

    return {
        show:show,
        hide:hide,
        toggle:toggle
    };
}());

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

$(function() {

});