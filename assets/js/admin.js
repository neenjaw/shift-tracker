/* global ShiftTracker */
/* global getURLParameter */
/* global User */

$(function() {
    var container = document.querySelector('.admin-container');
    var action = getURLParameter('action'); 

    if (!action) {
        container.innerHTML = ShiftTracker.templates.admin.default({});
    } else {
        if (action === 'changepw') {
            container.innerHTML = ShiftTracker.templates.admin.changePassword({test: 'test'});
        } else if (action === 'adduser' && User.admin) {
            container.innerHTML = ShiftTracker.templates.admin.create({ test: 'test' });            
        } else if (action === 'modifyuser' && User.admin) {
            container.innerHTML = ShiftTracker.templates.admin.modify({ test: 'test' });
        } else if (action === 'deletestaff' && User.admin) {
            container.innerHTML = ShiftTracker.templates.admin.deleteStaff({ test: 'test' });
        }
    }

    document.querySelectorAll('.admin-container .hidden').forEach(function(element) {
        if (User.admin) {
            element.classList.remove('hidden');
        } else {
            element.parentNode.removeChild(element);
        }
    });
});