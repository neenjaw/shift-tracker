/* global ShiftTracker */
/* global getURLParameter */
/* global Flash */
/* global User */
/* global axios */

$(function() {
    var container = document.querySelector('.admin-container');
    var action = getURLParameter('action'); 

    //
    // Support functions
    //

    function checkMatchingPws(newPw, rptPw) {
        return (newPw && rptPw && newPw === rptPw);
    }

    function matchSoFar(newPw, rptPw) {
        return (newPw && rptPw && (newPw.substring(0, rptPw.length) === rptPw));
    }

    function setPasswordRepeatChecker() {
        document.getElementById('rptPassword').addEventListener('input', function (ev) {
            var newPw = document.getElementById('newPassword');
            var rptPw = document.getElementById('rptPassword');
            console.log({
                new: newPw.value,
                rpt: rptPw.value
            });

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

    function validateMatchingPassword(newPw, rptPw) {
        if (!checkMatchingPws(newPw.value, rptPw.value)) {
            Flash.insertFlash('warning', 'New and repeat new password doesnt match.');
            rptPw.classList.remove('valid');
            rptPw.classList.remove('indeterminate');
            rptPw.classList.add('invalid');
        }
    }

    function onCommandSuccess(target) {
        window.history.pushState(null, 'Shift Tracker', '/admin');
        target.innerHTML = ShiftTracker.templates.admin.default({});
    }

    //
    // On document ready, do this first!
    //

    if (!action) {
        container.innerHTML = ShiftTracker.templates.admin.default({});
    } else {
        if (action === 'changepw') {
            changePasswordHandler(container);
        } else if (action === 'adduser' && User.admin) {
            createUserHandler(container);
        } else if (action === 'modifyuser' && User.admin) {
            // modifyUserHandler(container);
        } else if (action === 'deletestaff' && User.admin) {
            // deleteStaffHandler(container);
        }
    }

    document.querySelectorAll('.admin-container .hidden').forEach(function(element) {
        if (User.admin) {
            element.classList.remove('hidden');
        } else {
            element.parentNode.removeChild(element);
        }
    });

    //
    // Handlers for each command
    //

    function changePasswordHandler(target) {
        target.innerHTML = ShiftTracker.templates.admin.changePassword();

        setPasswordRepeatChecker();

        target.addEventListener('submit', function(ev) {
            ev.preventDefault();

            var oldpw = document.getElementById('oldPassword');
            var newPw = document.getElementById('newPassword');
            var rptPw = document.getElementById('rptPassword');

            validateMatchingPassword(newPw, rptPw); 

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
                        onCommandSuccess(target);
                    } 
                })
                .catch(function (error) {
                    Flash.insertFlash('danger', 'Unable to change your password.');
                    console.error(error);
                });
        });
    }

    function createUserHandler(target) {
        target.innerHTML = ShiftTracker.templates.admin.create();

        setPasswordRepeatChecker();

        target.addEventListener('submit', function (ev) {
            ev.preventDefault();

            var newUsername = document.getElementById('username');
            var newPw = document.getElementById('newPassword');
            var rptPw = document.getElementById('rptPassword');

            validateMatchingPassword(newPw, rptPw);

            //axios call here
            axios
                .post('/api/user/create.php', {
                    username: newUsername.value,
                    password: newPw.value,
                    repeatpw: rptPw.value,
                    created_by: User.name,
                    admin: 'false',
                    active: 'true'
                })
                .then(function (response) {
                    var data = response.data;

                    if (data.response !== 'OK') {
                        throw data.message;
                    }

                    if (data.created) {
                        Flash.insertFlash('success', 'User successfully created.');
                        onCommandSuccess(target);
                    }
                })
                .catch(function (error) {
                    var duplicateError = error.trim().match(/^.*1062 Duplicate entry '([a-zA-Z0-9]+)' for key 'username'.*$/);

                    if (duplicateError) {
                        Flash.insertFlash('danger', 'Cannot create user "'+duplicateError[1]+'", username already taken.');
                    } else {
                        Flash.insertFlash('danger', 'Unable to create the user.');
                    }
                    console.error(error);
                });
        });
    }
});

