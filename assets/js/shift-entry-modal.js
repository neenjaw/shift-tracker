/* global axios */
/* global ShiftTracker */
/* global Modal */
/* global User */

var ShiftEntryModal = (function(){

    var onupdate = null;
    var ondelete = null;

    function isFunction(f) {
        // eslint-disable-next-line no-extra-boolean-cast
        return !!(f && f.constructor && f.call && f.apply);
    }

    function setup() {
        var shiftId = document.querySelector('#shift-entry__shift-id').value;
        var shiftUpdated = document.querySelector('#shift-entry__shift-updated');

        var showEdits = document.querySelectorAll('a[data-show]');
        var hideEdits = document.querySelectorAll('button[data-hide]');
        var modList = document.querySelector('.shift-entry__mod-list');

        var currentRole = document.querySelector('.role-name');
        var rForm = document.querySelector('#role-edit');
        var rSelect = rForm.querySelector('select');

        var currentAssignment = document.querySelector('.assignment-name');
        var aForm = document.querySelector('#assignment-edit');
        var aSelect = aForm.querySelector('select');

        var mForm = document.querySelector('#mod-edit');
        var mSelect = mForm.querySelector('select');

        var deleteBtn = document.querySelector('.shift-entry__delete');
        var closeBtn = document.querySelector('.modal-close');

        function currentMods() {
            var items = document.querySelectorAll('.shift-entry__mod-list-item');
            var mods = [];

            items.forEach(function (i) {
                mods.push(i.dataset.modId);
            });

            return mods;
        }

        function disableCurrentMods() {
            var currMods = currentMods();
            var options = mSelect.querySelectorAll('option');
            var firstSet = false;

            options.forEach(function (o) {
                o.removeAttribute('disabled');

                for (let i = 0; i < currMods.length; i++) {
                    const mod = currMods[i];

                    if (o.value === mod) {
                        o.setAttribute('disabled', 'disabled');
                        break;
                    }
                }

                if (!firstSet && !o.disabled) {
                    mSelect.value = o.value;
                    firstSet = true;
                }
            });
        }

        function disableCurrent(current, select) {
            var options = select.querySelectorAll('option');
            var firstSet = false;

            options.forEach(function (o) {
                if (o.textContent === current) {
                    o.setAttribute('disabled', 'disabled');
                } else {
                    o.removeAttribute('disabled');
                }

                if (!firstSet && !o.disabled) {
                    select.value = o.value;
                    firstSet = true;
                }
            });
        }

        showEdits.forEach(function (e) {
            e.addEventListener('click', function (ev) {
                var target = document.querySelector('div[data-show-target="' + e.dataset.show + '"]');

                target.classList.toggle('hidden');
            });
        });

        hideEdits.forEach(function (e) {
            e.addEventListener('click', function (ev) {
                ev.preventDefault();

                var target = document.querySelector('div[data-show-target="' + e.dataset.hide + '"]');

                target.classList.add('hidden');
            });
        });

        function removeMod(elem) {
            var shiftModId = elem.dataset.shiftModId;
            var modId = elem.dataset.modId;

            //axios call here to delete shift mod 
            axios
                .post('/api/shift_to_mod/delete.php', {
                    id: shiftModId,
                })
                .then(function (response) {
                    var data = response.data;

                    if (data.response === 'OK' && data.deleted === true) {
                        //if success remove the mod

                        elem.parentNode.removeChild(elem);
                        disableCurrentMods();
                        shiftUpdated.value = 'true';
                    } else {
                        console.error('An error was encountered', data.message);
                    }
                })
                .catch(function (error) {
                    console.error('An error was encountered', error);
                });
        }

        modList.addEventListener('click', function (e) {
            var target = e.target;
            var parent = e.target.parentNode;
            var pparent = parent.parentNode;

            if (target.classList.contains('shift-entry__mod-list-item')) {
                removeMod(target);
            } else if(parent.classList.contains('shift-entry__mod-list-item')) {
                removeMod(parent);
            } else if (pparent.classList.contains('shift-entry__mod-list-item')) {
                removeMod(pparent);
            }
        });

        rForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var roleId = rSelect.value;
            var roleName = rForm.querySelector('option[value="' + roleId + '"]').textContent;

            //axious call to update shift entry
            axios
                .post('/api/shift/update.php', {
                    id: shiftId,
                    updated_by: User.name,
                    role_id: roleId
                })
                .then(function (response) {
                    var data = response.data;
                    console.log(data);
                    
                    if (data.response === 'OK' && data.updated === true) {
                        //if successful, update the role to the new role

                        currentRole.innerHTML = roleName;
                        disableCurrent(roleName, rSelect);
                        rForm.parentNode.classList.add('hidden');
                        shiftUpdated.value = 'true';
                    } else {
                        console.error('An error was encountered', data.message);
                    }
                })
                .catch(function (error) {
                    console.error('An error was encountered', error);
                });
        });

        disableCurrent(currentRole.textContent, rSelect);

        aForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var assignmentId = aSelect.value;
            var assignmentName = aForm.querySelector('option[value="' + assignmentId + '"]').textContent;

            //axious call to update shift entry
            axios
                .post('/api/shift/update.php', {
                    id: shiftId,
                    updated_by: User.name,
                    assignment_id: assignmentId
                })
                .then(function (response) {
                    var data = response.data;

                    if (data.response === 'OK' && data.updated === true) {
                        //if successful, update the role to the new role

                        currentAssignment.innerHTML = assignmentName;
                        disableCurrent(assignmentName, aSelect);
                        aForm.parentNode.classList.add('hidden');
                        shiftUpdated.value = 'true';
                    } else {
                        console.error('An error was encountered', data.message);
                    }
                })
                .catch(function (error) {
                    console.error('An error was encountered', error);
                });
        });

        disableCurrent(currentAssignment.textContent, aSelect);

        mForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var modId = mSelect.value;
            var modOption = mForm.querySelector('option[value="' + modId + '"]');
            var modName = modOption.textContent;
            var newShiftModId = 1;

            if (modOption.disabled) return;

            //axios call to create shift to mod entry
            axios
                .post('/api/shift_to_mod/create.php', {
                    shift_id: shiftId,
                    mod_id: modId
                })
                .then(function (response) {
                    var data = response.data;

                    if (data.response === 'OK' && data.created === true) {
                        //if success show the list item
                        var element = '<li class="shift-entry__mod-list-item" data-shift-mod-id="' + data.created_shiftmod_id + '" data-mod-id="' + modId + '">\n';
                        element += modName + '&nbsp;<i class="fas fa-times"></i>\n';
                        element += '</li >';

                        modList.insertAdjacentHTML('beforeend', element);
                        disableCurrentMods();
                    } else {
                        console.error('An error was encountered', data.message);
                    }
                })
                .catch(function (error) {
                    console.error('An error was encountered', error);
                });
        });

        disableCurrentMods();

        deleteBtn.addEventListener('click', function (e) {
            //axios call to delete shift
            axios   
                .post('/api/shift/delete.php', {
                    id: shiftId
                })
                .then(function (response) {
                    var data = response.data;

                    if (data.response === 'OK' && data.deleted === true) {
                        //close modal
                        Modal.hideModal();

                        if (isFunction(ondelete)) {
                            ondelete();
                        }
                    } else {
                        console.error('An error was encountered', data.message);
                    }
                })
                .catch(function (error) {
                    console.error('Unable to delete shift - Error encountered', error);

                    //close modal
                    Modal.hideModal();

                    if (shiftUpdated.value === 'true') {
                        if (isFunction(onupdate)) {
                            onupdate();
                        }
                    }
                });
        });

        closeBtn.addEventListener('click', function (e) {
            if (shiftUpdated.value === 'true') {
                if (isFunction(onupdate)) {
                    onupdate();
                }
            }
        });
    }

    function show(options) {
        options = options || {};

        if (! options.shiftEntryId) {
            return false;
        }

        onupdate = onupdate || options.onupdate;
        ondelete = ondelete || options.ondelete;

        //axios get request for shift ID data
        axios
            .all([
                axios.get('/api/role/read.php'),
                axios.get('/api/assignment/read.php'),
                axios.get('/api/mod/read.php'),
                axios.get('/api/shift/read_one.php', {params: {id: options.shiftEntryId}})
            ])  
            .then(axios.spread(function (rResponse, aResponse, mResponse, sResponse) {
                console.log({roles, assignments, mods, sResponse});

                var roles = [
                    { id: -1, name: 'no roles exist.' }
                ];

                var mods = [
                    { id: -1, name: 'no mods exist.' }
                ];

                var assignments = [
                    { id: -1, name: 'no assignments exist.' }
                ];

                if (rResponse.data.response === 'OK' && rResponse.data.count > 0) {
                    roles = rResponse.data.records.map(function (record) {
                        return {
                            id: record.id,
                            name: record.name
                        };
                    });
                }

                if (aResponse.data.response === 'OK' && aResponse.data.count > 0) {
                    assignments = aResponse.data.records.map(function (record) {
                        return {
                            id: record.id,
                            name: record.name
                        };
                    });
                }

                if (mResponse.data.response === 'OK' && mResponse.data.count > 0) {
                    mods = mResponse.data.records.map(function (record) {
                        return {
                            id: record.id,
                            name: record.name
                        };
                    });
                }

                var data = sResponse.data;

                if (data.response === 'OK' && data.count === 1) {
                    var shift = data.records[0];

                    Modal.showModal({
                        onshow: setup,
                        innerHTML: ShiftTracker.templates.modal({
                            whichContent: 'shift_entry_modal_content',
                            whichFooter: 'shift_entry_modal_footer',
                            id: shift.id,
                            title: shift.staff_first_name + ' ' + shift.staff_last_name + '\'s shift:',
                            name: shift.staff_first_name + ' ' + shift.staff_last_name,
                            date: shift.shift_date,
                            d_or_n: shift.shift_d_or_n,
                            role_name: shift.role_name,
                            assignment_name: shift.assignment_name,
                            shift_mods: shift.shift_mods,
                            roles: roles,
                            assignments: assignments,
                            mods: mods
                        })
                    });
                } else {
                    console.error('An was encountered, unable to get shift data', data.message);
                }
            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    return {
        show: show
    };
}());