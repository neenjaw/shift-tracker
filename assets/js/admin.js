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

    function removeHiddenButtons() {
        document.querySelectorAll('.admin-container .hidden').forEach(function (element) {
            if (User.admin) {
                element.classList.remove('hidden');
            }
            else {
                element.parentNode.removeChild(element);
            }
        });
    }

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

            return false;
        }

        return true;
    }

    function onCommandSuccess(target) {
        window.history.pushState(null, 'Shift Tracker', '/admin');
        target.innerHTML = ShiftTracker.templates.admin.default({});
        removeHiddenButtons();
    }

    //
    // On document ready, do this first!
    //

    if (!action) {
        container.innerHTML = ShiftTracker.templates.admin.default({});
        removeHiddenButtons();
    } else {
        if (action === 'changepw') {
            changePasswordHandler(container);
        } else if (action === 'adduser' && User.admin) {
            createUserHandler(container);
        } else if (action === 'modifyuser' && User.admin) {
            modifyUserHandler(container);
        } else if (action === 'deletestaff' && User.admin) {
            deleteStaffHandler(container);
        }
    }


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
            var isAdmin = document.getElementById('isAdmin');

            if (!validateMatchingPassword(newPw, rptPw)) {
                return false;
            }

            //axios call here
            axios
                .post('/api/user/create.php', {
                    username: newUsername.value,
                    password: newPw.value,
                    repeatpw: rptPw.value,
                    created_by: User.name,
                    admin: ((isAdmin.checked) ? 'true' : 'false'),
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

    function modifyUserHandler(target) {
        axios
            .get('/api/user/read.php')
            .then(function(response) {
                var data = response.data;

                if (data.response !== 'OK') {
                    throw data.message;
                }

                var records = data.records.filter(function(record) {
                    return (record.username !== User.name && record.username !== 'root');
                });

                target.innerHTML = ShiftTracker.templates.admin.modify({users: records});

                setPasswordRepeatChecker();

                target.addEventListener('change', function(ev) {
                    if (ev.target.id === 'changePw') {
                        var inputs = ev.target.parentNode.parentNode.querySelectorAll('input[type="password"]');
    
                        for (var index = 0; index < inputs.length; index++) {
                            var input = inputs[index];

                            input.disabled = !input.disabled;                            
                        }
                    }
                });

                target.addEventListener('submit', function (ev) {
                    ev.preventDefault();

                    if (ev.target.id === 'user-form') {
                        var userSelect = document.querySelector('#user-select');
                        var userOption = userSelect.querySelector('option[value="'+userSelect.value+'"]');
                        var userSubmit = document.querySelector('#user-form button');

                        userSelect.disabled = true;
                        userSubmit.disabled = true;

                        var userDiv = document.querySelector('div.user');
                        var editDiv = document.querySelector('div.edit.hidden');

                        editDiv.querySelector('#userId').value = userSelect.value;
                        editDiv.querySelector('#username').value = userOption.innerText.trim();
                        editDiv.querySelector('#username').dataset.originalName = userOption.innerText.trim();
                        editDiv.querySelector('#isActive').checked = (userOption.dataset.userActive === 'true') ? true : false;
                        editDiv.querySelector('#isActive').dataset.originalState = userOption.dataset.userActive;
                        editDiv.querySelector('#isAdmin').checked = (userOption.dataset.userAdmin === 'true') ? true : false;
                        editDiv.querySelector('#isAdmin').dataset.originalState = userOption.dataset.userAdmin;
                        
                        editDiv.classList.remove('hidden');
                        userDiv.classList.add('hidden');
                    } else if (ev.target.id === 'modify-form') {
                        var edit = document.querySelector('div.edit');
                        var newUsername = edit.querySelector('#username');
                        var changePassword = edit.querySelector('#changePw');
                        var newPassword = edit.querySelector('#newPassword');
                        var newRptPassword = edit.querySelector('#rptPassword');
                        var isActive = edit.querySelector('#isActive');
                        var isAdmin = edit.querySelector('#isAdmin');

                        var changed = false;

                        var payload = {
                            id: document.querySelector('#userId').value,
                            updated_by: User.name
                        };
                        
                        if (newUsername.value !== newUsername.dataset.originalName) {
                            changed = true;
                            payload.username = newUsername.value;
                        }

                        if (isActive.checked !== (isActive.dataset.originalState === 'true')) {
                            changed = true;
                            payload.active = (isActive.checked) ? 'true' : 'false';
                        }

                        if (isAdmin.checked !== (isAdmin.dataset.originalState === 'true')) {
                            changed = true;
                            payload.admin = (isAdmin.checked) ? 'true' : 'false';
                        }

                        if (changePassword.checked) {
                            if (validateMatchingPassword(newPassword, newRptPassword)) {

                                changed = true;
                                payload.password = newPassword.value;
                                payload.repeatpw = newRptPassword.value;
                                
                            } else {
                                Flash.insertFlash('warning', 'Passwords don\'t match');
                                return false;
                            }
                        }

                        if (changed) {
                            axios
                                .post('/api/user/update.php', payload)
                                .then(function(response) {
                                    var data = response.data;

                                    if (data.response !== 'OK') {
                                        throw data.message;
                                    }

                                    Flash.insertFlash('success', 'User successfully updated.');
                                    onCommandSuccess(target);
                                })
                                .catch(function(error) {
                                    console.error(error);
                                    Flash.insertFlash('danger', 'There was a problem updating the user.');
                                });
                        } else {
                            Flash.insertFlash('warning', 'Nothing changed, no action taken.');
                        }
                    }
                });
            })
            .catch(function(error) {
                console.error(error);
                
                target.innerHTML = ShiftTracker.templates.admin.error();
            });
    }

    function deleteStaffHandler(target) {
        axios
            .get('/api/staff_member/read.php')
            .then(function(response) {
                var data = response.data;

                if (data.response !== 'OK') {
                    throw data.message;
                }

                target.innerHTML = ShiftTracker.templates.admin.deleteStaff({
                    staffMembers: data.records.map(function(record) {
                        return {
                            firstName: record.first_name,
                            lastName: record.last_name,
                            id: record.id,
                            categoryName: record.category_name
                        };
                    })
                });       
                
                target.addEventListener('submit', function(ev) {
                    ev.preventDefault();

                    var formElement = ev.target;
                    var staffSelect = formElement.querySelector('select');
                    var staffOption = staffSelect.querySelector('option[value="'+staffSelect.value+'"]');
        
                    if (confirm('Are you sure you want to delete '+staffOption.innerText.trim()+'?')) {
                        axios
                            .post('/api/staff_member/delete.php', { id: staffSelect.value })
                            .then(function(response) {
                                var data = response.data;

                                if (data.response !== 'OK' || !data.deleted) {
                                    throw data.message;
                                }

                                Flash.insertFlash('success', 'Staff member successfully deleted.');
                                onCommandSuccess(target);
                            })
                            .catch(function(error) {
                                console.error(error);
                                target.innerHTML = ShiftTracker.templates.admin.error({errorMsg: 'There was a problem deleting the staff member.'});       
                            });

                    }
                });
            })
            .catch(function(error) {
                console.error(error);
                
                target.innerHTML = ShiftTracker.templates.admin.error({});       
            });
    }
});

