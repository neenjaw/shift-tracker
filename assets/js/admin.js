/* global ShiftTracker */
/* global getURLParameter */

$(function() {
    var container = document.querySelector('.admin-container');
    var action = getURLParameter('action'); 

    if (!action) {
        container.innerHTML = ShiftTracker.templates.admin.default({});
    } else {
        container.innerHTML = ShiftTracker.templates.admin[action]({});
    }
});