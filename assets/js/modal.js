var Modal = (function() {
    var modalContainer = document.querySelector('.modal-container');
    var className = {
        hidden: 'hidden',
        show: 'show',
        close: 'modal-close'
    };

    function showModal(options) {
        options = options || {};

        modalContainer.innerHTML = '';
        modalContainer.innerHTML = options.innerHTML || '';

        if (options.onshow) {
            var callback = options.onshow;
            
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!(callback && callback.constructor && callback.call && callback.apply )) {
                callback();
            }
        }

        modalContainer.classList.remove(className.hidden);
        setTimeout(function() {
            modalContainer.classList.add(className.show);
        }, 1);
    }

    function hideModal(options) {
        modalContainer.classList.remove(className.show);
        setTimeout(function() {
            if (!modalContainer.classList.contains(className.show)) {
                modalContainer.classList.add(className.hidden);
            }
        }, 200);
    }

    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains(className.close)) {
            hideModal();
        }
    });

    return {
        showModal: showModal,
        hideModal: hideModal
    };
}());