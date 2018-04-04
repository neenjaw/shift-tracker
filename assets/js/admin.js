/* global ShiftTracker */
/* global getURLParameter */
/* global Flash */
/* global User */
/* global axios */

$(function() {
    var container = document.querySelector('.admin-container');
    var action = getURLParameter('action'); 

    if (!action) {
        container.innerHTML = ShiftTracker.templates.admin.default({});
    } else {
        if (action === 'changepw') {
            changePasswordHandler(container);
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

    function changePasswordHandler(target) {
        function checkMatchingPws(newPw, rptPw) {
            return (newPw && rptPw && newPw === rptPw);
        }

        function matchSoFar(newPw, rptPw) {
            return (newPw && rptPw && (newPw.substring(0, rptPw.length) === rptPw));
        }

        target.innerHTML = ShiftTracker.templates.admin.changePassword({test: 'test'});

        target.addEventListener('submit', function(ev) {
            ev.preventDefault();

            var oldpw = document.getElementById('oldPassword');
            var newPw = document.getElementById('newPassword');
            var rptPw = document.getElementById('rptPassword');

            if (!checkMatchingPws(newPw.value, rptPw.value)) {
                Flash.insertFlash('warning', 'New and repeat new password doesnt match.');
                rptPw.classList.remove('valid');                
                rptPw.classList.remove('indeterminate');                
                rptPw.classList.add('invalid');                
            } 

            axios
                .post('/api/user/change_password.php', {
                    username: User.name,
                    password: oldpw.value,
                    new_password: newPw.value,
                    repeat_password: rptPw.value,
                    updated_by: User.name
                })
                .then(function (response) {
                    var data = response.data;

                    if (data.response !== 'OK') {
                        throw data.message;
                    }

                    if (data.password_changed) {
                        Flash.insertFlash('success', 'Password Successfully changed.');
                        window.history.pushState(null, 'Shift Tracker', '/admin');
                        target.innerHTML = ShiftTracker.templates.admin.default({});
                    } 
                })
                .catch(function (error) {
                    Flash.insertFlash('danger', 'Unable to change your password.');
                    console.error(error);
                });
        });

        document.getElementById('rptPassword').addEventListener('input', function(ev) {
            var newPw = document.getElementById('newPassword');
            var rptPw = document.getElementById('rptPassword');
            console.log({new:newPw.value, rpt: rptPw.value});

            if (checkMatchingPws(newPw.value, rptPw.value)) {
                rptPw.classList.remove('invalid');
                rptPw.classList.remove('indeterminate');
                rptPw.classList.add('valid');
            } else {
                if (matchSoFar(newPw.value, rptPw.value)) {
                    rptPw.classList.remove('invalid');
                    rptPw.classList.remove('valid');
                    rptPw.classList.add('indeterminate');
                } else {
                    rptPw.classList.remove('indeterminate');
                    rptPw.classList.remove('valid');
                    rptPw.classList.add('invalid');
                }
            }
        });
    }
});

