/*global axios*/
/*global Handlebars*/
/*global ShiftTracker*/
/*global getURLParameter*/

var StaffPage = (function() {    
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

                    var roleStats = {};
                    var categoryStats = {};
                    var assignmentStats = {};

                    shiftResponse.data.records.forEach(function(record) {
                        categoryStats[record.category_id] = categoryStats[record.category_id] || {name:record.category_name, count: 0};
                        categoryStats[record.category_id].count++;

                        roleStats[record.role_id] = roleStats[record.role_id] || { name: record.role_name, count: 0 };
                        roleStats[record.role_id].count++;

                        assignmentStats[record.assignment_id] = assignmentStats[record.assignment_id] || { name: record.assignment_name, count: 0 };
                        assignmentStats[record.assignment_id].count++;
                    });

                    var data = {
                        staff: staffObj,
                        shifts: shiftResponse.data.records,
                        shiftCount: shiftResponse.data.count,
                        categories: categories,
                        roleStats: Object.values(roleStats),
                        assignmentStats: Object.values(assignmentStats),
                        categoryStats: Object.values(categoryStats)
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

    return {
        showIndex: showIndex,
        showStaff: showStaff
    };
}());

$(function() {
    var container = document.querySelector('.container.content');
    var id = getURLParameter('staff_id');

    container.innerHTML = ShiftTracker.templates.loader({ date: '2018-01-02' });    

    if (id) {
        StaffPage.showStaff(container, id, setupShowPage);
    } else {
        StaffPage.showIndex(container);
    }
});

function setupShowPage() {
    var staffId = document.getElementById('staff__id');
    var statItems = document.querySelectorAll('.stat__item');
    var showEdits = document.querySelectorAll('a[data-staff-edit]');
    var hideEdits = document.querySelectorAll('button[data-staff-edit]');

    var currentCategory = document.querySelector('.staff__category-name');
    var cForm = document.getElementById('category');
    var cSelect = cForm.querySelector('select');

    var currentActive = document.querySelector('.staff__active-name');
    var aForm = document.getElementById('active');
    var aSelect = aForm.querySelector('select');

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
    
    statItems.forEach(function (e) {
        var p = e.querySelector('p');
        var percent = e.dataset.statPercent;

        setTimeout(function () {
            p.style.width = percent;
        }, 1);
    });

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
}