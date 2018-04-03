/*global axios*/
/*global Handlebars*/
/*global ShiftTracker*/
/*global getURLParameter*/

var StaffPage = (function () {

    function isFunction(f) {
        // eslint-disable-next-line no-extra-boolean-cast
        return !!(f && f.constructor && f.call && f.apply);
    }

    // Get the natural height of the element
    function getElemHeight(elem) {
        elem.style.display = 'block';
        var height = elem.scrollHeight + 'px';
        elem.style.display = '';
        return height;
    }

    //FIXME: There is a problem with the non-vent counting.  It is counting the inverse of the vented shifts, but it should only cound the inverse of the vented shifts when AT THE BEDSIDE
    function getShiftStats(records) {
        var roleStats = {};
        var categoryStats = {};
        var assignmentStats = {};
        var modStats = {};
        var dCount = 0;
        var nCount = 0;

        records.forEach(function (record) {
            categoryStats[record.category_id] = categoryStats[record.category_id] || { name: record.category_name, count: 0 };
            categoryStats[record.category_id].count++;

            roleStats[record.role_id] = roleStats[record.role_id] || { name: record.role_name, count: 0 };
            roleStats[record.role_id].count++;

            assignmentStats[record.assignment_id] = assignmentStats[record.assignment_id] || { name: record.assignment_name, count: 0 };
            assignmentStats[record.assignment_id].count++;

            if (record.shift_mods) {
                for (let i = 0; i < record.shift_mods.length; i++) {
                    var mod = record.shift_mods[i];
                    
                    modStats[mod.mod_name] = modStats[mod.mod_name] || { name: mod.mod_name, count: 0 };
                    modStats[mod.mod_name].count++;
                }
            }

            if (record.shift_d_or_n === 'D') dCount++;
            if (record.shift_d_or_n === 'N') nCount++;
        });

        if (modStats.vent) {
            modStats.nonvent = { name: 'non-vented', count: (records.length - modStats.vent.count)};
        } else {
            modStats.nonvent = { name: 'non-vented', count: (records.length) };            
        }

        roleStats = Object.values(roleStats);
        assignmentStats = Object.values(assignmentStats);
        categoryStats = Object.values(categoryStats);
        modStats = Object.values(modStats);

        return {
            roleStats:roleStats,
            assignmentStats:assignmentStats,
            categoryStats:categoryStats,
            modStats:modStats,
            dayCount: dCount,
            nightCount: nCount
        };
    }

    function showStats(container, id, callback) {

        axios
            .get('/api/shift/read_one_staff.php', { params: { staff_id: id } })
            .then(function(response) {
                if (response.data.response === 'OK') {
                    var stats = getShiftStats(response.data.records);

                    container.innerHTML = ShiftTracker.templates.partial.holder({
                        whichPartial: 'staff_detail_statistics',
                        shiftCount: response.data.count,
                        roleStats: stats.roleStats,
                        assignmentStats: stats.assignmentStats,
                        categoryStats: stats.categoryStats,
                        modStats: stats.modStats,
                        dayCount: stats.dayCount,
                        nightCount: stats.nightCount
                    });

                    if(isFunction(callback)) {
                        callback();
                    }
                }
            })
            .catch(function(error) {
                container.innerHTML = ShiftTracker.templates.staff.error({ errorMsg: 'Unable to update shift stats, <a href="/staff?staff_id='+id+'">reload.</a>'});
            });
    }

    function showIndex(container) {
        axios
            .get('/api/staff_member/read.php')
            .then(function (response) {
                
                var data = response.data;

                if (data.response === 'OK') {
                    var groups = {
                        RN: {name: 'RN', staff: []},
                        LPN: {name: 'LPN', staff: []},
                        NA: {name: 'NA', staff: []},
                        UC: {name: 'UC', staff: []}
                    };

                    data.records.forEach(function(element) {
                        groups[element.category_name].staff.push(element);
                    });

                    container.innerHTML = ShiftTracker.templates.staff.index({ groups: groups });
                } else {
                    container.innerHTML = ShiftTracker.templates.staff.error();
                }
            })
            .catch(function (error) {
                console.error(error);
                container.innerHTML = ShiftTracker.templates.staff.error();
            });
    }

    function showStaff(container, id, callback) {
        axios
            .all([
                axios.get('/api/staff_member/read_one.php', {params: {id: id}}),
                axios.get('/api/shift/read_one_staff.php', {params: {staff_id: id}}),
                axios.get('/api/category/read.php')
            ])
            .then(axios.spread(function (staffResponse, shiftResponse, categoryResponse) {

                if (
                    staffResponse.data.response === 'OK' && 
                    staffResponse.data.count === 1 &&
                    shiftResponse.data.response === 'OK' && 
                    categoryResponse.data.response === 'OK'
                ) {
                    var staffObj = staffResponse.data.records.map(function (record) {
                        return {
                            id: record.id,
                            firstName: record.first_name,
                            lastName: record.last_name,
                            categoryId: record.category_id,
                            categoryName: record.category_name,
                            active: ((record.active === '1') ? true : false)
                        };
                    })[0];

                    var categories = [
                        {id: -1, name: 'no categories exist.'}
                    ];

                    if (categoryResponse.data.count > 0) {
                        categories = categoryResponse.data.records;
                    }

                    var stats = getShiftStats(shiftResponse.data.records);

                    var data = {
                        staff: staffObj,
                        shifts: shiftResponse.data.records,
                        shiftCount: shiftResponse.data.count,
                        categories: categories,
                        roleStats: stats.roleStats,
                        assignmentStats: stats.assignmentStats,
                        categoryStats: stats.categoryStats,
                        modStats: stats.modStats,
                        dayCount: stats.dayCount,
                        nightCount: stats.nightCount
                    };

                    container.innerHTML = ShiftTracker.templates.staff.display(data);

                    callback();
                }
            }))
            .catch(function (error) {
                console.error(error);
                container.innerHTML = ShiftTracker.templates.staff.error();
            });
    }

    function showForm(row, id, link, icons) {
        axios
            .all([
                axios.get('/api/assignment/read.php'),
                axios.get('/api/role/read.php'),
                axios.get('/api/mod/read.php'),
                axios.get('/api/shift/read_one.php', {
                    params: {
                        id: id
                    }
                })
            ])
            .then(axios.spread(function (aResponse, rResponse, mResponse, sResponse) {
                console.log(sResponse.data);

                var contentData = {};

                if (sResponse.data.response === 'OK' && aResponse.data.count > 0) {
                    contentData.shift = sResponse.data.records[0];
                } else {
                    throw 'Unable to get shift data';
                }

                if (aResponse.data.response === 'OK' && aResponse.data.count > 0) {
                    contentData.assignments = aResponse.data.records.map(function (record) {
                        var r = {
                            id: record.id,
                            name: record.name
                        };

                        return r;
                    });
                } else {
                    throw 'Unable to get assignment data';
                }

                if (rResponse.data.response === 'OK' && rResponse.data.count > 0) {
                    contentData.roles = rResponse.data.records.map(function (record) {
                        var r = {
                            id: record.id,
                            name: record.name
                        };

                        return r;
                    });
                } else {
                    throw 'Unable to get role data';
                }

                if (mResponse.data.response === 'OK' && mResponse.data.count > 0) {
                    contentData.mods = mResponse.data.records.map(function (record) {
                        var r = {
                            id: record.id,
                            name: record.name
                        };

                        return r;
                    });
                } else {
                    throw 'Unable to get mod data';
                }

                var content = ShiftTracker.templates.staff.shiftForm(contentData);
                showHelper(row, content, link, icons);
            }))
            .catch(function (error) {
                console.error(error);

                var content = ShiftTracker.templates.staff.shiftFormError({});
                showHelper(row, content);
            });

        function showHelper(row, content, link, icons) {
            // row.parentNode.insertBefore(sp1, row.nextSibling);
            row.insertAdjacentHTML('afterend', content);

            var elem = row.nextElementSibling.querySelector('.shift-edit-container');
            var height = getElemHeight(elem); // Get the natural height

            elem.classList.remove('hidden'); // Make the element visible
            elem.classList.add('showing');
            elem.style.height = height; // Update the max-height

            // Once the transition is complete, remove the inline max-height so the content can scale responsively
            window.setTimeout(function () {
                elem.classList.add('visible');
                elem.classList.remove('showing');
                elem.style.height = '';

                link.innerHTML = icons.cancel;
            }, 350);
        }
    }

    function hideForm(row, icons) {
        var elem = row.querySelector('.shift-edit-container');

        elem.classList.remove('visible');
        elem.classList.add('hiding');
        elem.style.height = elem.scrollHeight + 'px';

        setTimeout(function () {
            elem.style.height = '0px'; // Update the max-height

            // When the transition is complete, hide it
            setTimeout(function () {
                elem.classList.remove('hiding');
                elem.classList.add('hidden');
                elem.style.height = '';

                var prevRowA = row.previousElementSibling.querySelector('a[data-shift-id]');
                
                if (prevRowA !== null) {
                    prevRowA.innerHTML = icons.edit;
                }

                row.parentNode.removeChild(row);
            }, 350);
        }, 10);
    }

    return {
        showIndex: showIndex,
        showStaff: showStaff,
        showStats: showStats,
        showForm: showForm,
        hideForm: hideForm
    };
}());

$(function() {
    var container = document.querySelector('.container.content');
    var id = getURLParameter('staff_id');

    container.innerHTML = ShiftTracker.templates.loader({});    

    if (id) {
        StaffPage.showStaff(container, id, setupShowPage);
    } else {
        StaffPage.showIndex(container);
    }
});

function setupShowPage() {
    var icons = {
        edit: '<i class="far fa-edit"></i>',
        cancel: '<i class="far fa-times-circle"></i>',
        load: '<i class="fas fa-spinner fa-pulse"></i>'
    };

    var staffId = document.getElementById('staff__id');
    var showEdits = document.querySelectorAll('a[data-staff-edit]');
    var hideEdits = document.querySelectorAll('button[data-staff-edit]');

    var currentCategory = document.querySelector('.staff__category-name');
    var cForm = document.getElementById('category');
    var cSelect = cForm.querySelector('select');

    var currentActive = document.querySelector('.staff__active-name');
    var aForm = document.getElementById('active');
    var aSelect = aForm.querySelector('select');

    var sLinks = document.querySelectorAll('table a[data-shift-id]');

    var shiftEditForm = document.getElementsByClassName('shift-edit-row');

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

    disableCurrent(currentCategory.textContent, cSelect);    
    disableCurrent(currentActive.textContent, aSelect);
    
    function displayPercentBar() {
        var statItems = document.querySelectorAll('.stat__item');

        statItems.forEach(function (e) {
            var p = e.querySelector('p');
            var percent = e.dataset.statPercent;

            setTimeout(function () {
                p.style.width = percent;
            }, 1);
        });
    }

    displayPercentBar();

    function reloadStaffStats() {
        var container = document.querySelector('.staff__shift-stats');

        container.innerHTML = ShiftTracker.templates.loader({});

        StaffPage.showStats(container, staffId.value, function () {
            displayPercentBar();
        });
    }

    showEdits.forEach(function (e) {
        e.addEventListener('click', function (ev) {
            var target = document.querySelector('div[data-staff-edit-target="' + e.dataset.staffEdit + '"]');

            target.classList.toggle('hidden');
        });
    });

    hideEdits.forEach(function (e) {
        e.addEventListener('click', function (ev) {
            ev.preventDefault();

            var target = document.querySelector('div[data-staff-edit-target="' + e.dataset.staffEdit + '"]');

            target.classList.add('hidden');
        });
    });

    cForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var categoryId = cSelect.value;
        var categoryName = cForm.querySelector('option[value="' + categoryId + '"]').textContent;

        //axious call to update shift entry
        axios
            .post('/api/staff_member/update.php', {
                id: staffId.value,
                updated_by: 'webuser',
                category_id: categoryId
            })
            .then(function (response) {
                var data = response.data;

                if (data.response === 'OK' && data.updated === true) {
                    //if successful, update the role to the new role

                    currentCategory.innerHTML = categoryName;
                    disableCurrent(categoryName, cSelect);
                    cForm.parentNode.classList.add('hidden');
                } else {
                    console.error('An error was encountered', data.message);
                }
            })
            .catch(function (error) {
                console.error('An error was encountered', error);
            });
    });

    aForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var activeValue = aSelect.value;
        var activeName = aForm.querySelector('option[value="' + activeValue + '"]').textContent;

        //axious call to update shift entry
        axios
            .post('/api/staff_member/update.php', {
                id: staffId.value,
                updated_by: 'webuser',
                active: ((activeValue === '1') ? 'true' : 'false')
            })
            .then(function (response) {
                var data = response.data;

                if (data.response === 'OK' && data.updated === true) {
                    //if successful, update the role to the new role

                    currentActive.innerHTML = activeName;
                    disableCurrent(activeName, aSelect);
                    aForm.parentNode.classList.add('hidden');
                } else {
                    console.error('An error was encountered', data.message);
                }
            })
            .catch(function (error) {
                console.error('An error was encountered', error);
            });
    });

    sLinks.forEach(function (link) {
        link.addEventListener('click', function (ev) {
            var link = this;

            var target = ev.target;
            var shiftId = null;
            
            // find the tr elem parent
            while(target.localName !== 'tr') {
                if (target.localName === 'a') {
                    shiftId = target.dataset.shiftId;
                } 

                target = target.parentNode;
            }

            link.innerHTML = icons.load;

            if (shiftEditForm.length > 0) {
                var container = shiftEditForm[0].querySelector('.shift-edit-container');

                if (!container.classList.contains('visible')) return;

                //if the link is the current form's link, then toggle
                if (shiftEditForm[0] === target.nextElementSibling) {
                    StaffPage.hideForm(shiftEditForm[0], icons);

                //else hide the form, then open the new one after
                } else {
                    StaffPage.hideForm(shiftEditForm[0], icons);

                    setTimeout(function () {
                        StaffPage.showForm(target, shiftId, link, icons);
                    }, 360);
                }

            } else {
                StaffPage.showForm(target, shiftId, link, icons);
            }
        });
    });

    window.addEventListener('click', function (e) {
        if (
            e.target.classList.contains('delete-shift') || 
            e.target.classList.contains('cancel-edit') ||
            e.target.classList.contains('submit-edit')
        ) {
            e.preventDefault();

            if (e.target.classList.contains('delete-shift')) {
                shiftEditFormDeleteShift(shiftEditForm[0]);
            }

            if (e.target.classList.contains('cancel-edit')) {
                shiftEditFormCancel(shiftEditForm[0]);
            }

            if (e.target.classList.contains('submit-edit')) {
                shiftEditFormSubmit(shiftEditForm[0]);
            }
        }
    });

    function shiftEditFormDeleteShift(formElem) {
        var shiftId = formElem.dataset.shiftId;

        if(confirm('Are you sure you want to delete this shift?')) {
            axios
                .post('/api/shift/delete.php', {
                    id: shiftId,
                })
                .then(function(response) {
                    if (response.data.response === 'OK') {
                        // formElem.previousElementSibling.querySelectorAll('*').forEach(function (e) {
                        //     e.classList.add('deleted');
                        // });

                        formElem.previousElementSibling.parentNode.removeChild(formElem.previousElementSibling);

                        reloadStaffStats();

                        StaffPage.hideForm(formElem, icons);   
                    }                 
                })
                .catch(function(error) {
                    console.error(error);
                                        
                    alert('Unable to delete shift.');

                    StaffPage.hideForm(formElem, icons);                    
                });
        }
    }

    function shiftEditFormCancel(formElem) {
        formElem.previousElementSibling.querySelector('a[data-shift-id]').innerHTML = icons.load;

        StaffPage.hideForm(formElem, icons);
    }

    function shiftEditFormSubmit(formElem) {
        var shiftId = formElem.dataset.shiftId;

        var currentAssignment = formElem
            .previousElementSibling
            .querySelector('.assignment');

        var currentAssignmentName = currentAssignment.innerText;

        var currentRole = formElem
            .previousElementSibling
            .querySelector('.role');

        var currentRoleName = currentRole.innerText;

        //get the assignment
        var selectAssignment = formElem
            .querySelector('select.shift-edit__assignment');

        var selectedAssignmentName = selectAssignment
            .querySelector('option[value="'+selectAssignment.value+'"]')
            .innerText;

        var selectedAssignmentValue = selectAssignment.value;

        //get the role
        var selectRole = formElem
            .querySelector('select.shift-edit__role');
        
        var selectedRoleName = selectRole
            .querySelector('option[value="' + selectRole.value + '"]')
            .innerText;

        var selectedRoleValue = selectRole.value;

        //figure out what mods were previously added
        var previouslySelectedMods = Array
            .from(
                formElem.querySelectorAll('input[type="checkbox"][data-shiftmod-id]')
            )
            .map(function(elem) {
                return {
                    shiftModId: elem.dataset.shiftmodId,
                    modId: elem.value
                };
            });

        var selectedMods = Array
            .from(
                formElem.querySelectorAll('input[type="checkbox"]:checked')
            )
            .map(function(elem) {
                return {
                    modId: elem.value
                };
            });
        
        var modsToRemove = previouslySelectedMods
            .filter(function(m) {
                var toRemove = true;

                for (let i = 0; i < selectedMods.length; i++) {
                    var s = selectedMods[i];

                    if (s.modId === m.modId) {
                        toRemove = false;
                        break;
                    }
                }

                return toRemove;
            });

        var modsToAdd = selectedMods
            .filter(function (m) {
                var toAdd = true;

                for (let i = 0; i < previouslySelectedMods.length; i++) {
                    var s = previouslySelectedMods[i];

                    if (s.modId === m.modId) {
                        toAdd = false;
                        break;
                    }
                }

                return toAdd;
            });

        var axiosPostCalls = [];

        var updateShift = false;
        var shiftParams = {
            id: shiftId,
            updated_by: 'webuser'
        };
        
        if (currentAssignmentName !== selectedAssignmentName) {
            shiftParams.assignment_id = selectedAssignmentValue;
            updateShift = true;
        }

        if (currentRoleName !== selectedRoleName) {
            shiftParams.role_id = selectedRoleValue;
            updateShift = true;
        }

        if (updateShift) {
            axiosPostCalls.push(axios.post('/api/shift/update.php', shiftParams));
        }

        if (modsToRemove.length > 0) {
            modsToRemove.forEach(function(mod) {
                axiosPostCalls.push(axios.post('/api/shift_to_mod/delete.php', {
                    id: mod.shiftModId
                }));
            });
        }


        if (modsToAdd.length > 0) {
            modsToAdd.forEach(function (mod) {
                axiosPostCalls.push(axios.post('/api/shift_to_mod/create.php', {
                    shift_id: shiftId,
                    mod_id: mod.modId
                }));
            });
        }

        if (axiosPostCalls.length === 0) {
            StaffPage.hideForm(formElem, icons);      
        } else {
            axios
                .all(axiosPostCalls)
                .then(function (responses) {
                    var datum = responses.map(function (response) {
                        return response.data;
                    });

                    datum.forEach(function (data) {
                        if (data.response === 'OK') {
                            if (data.message.match(/^shift.+updated\.$/)) {
                                currentAssignment.innerHTML = selectedAssignmentName;
                                currentRole.innerHTML = selectedRoleName;
                            }
                        }
                    });

                    reloadStaffStats();

                    StaffPage.hideForm(formElem, icons);
                })
                .catch(function (error) {
                    console.error(error);

                    alert('Unable to delete shift.');

                    StaffPage.hideForm(formElem, icons);
                });
        }
    }
}