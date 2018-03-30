/* global ShiftTracker */
/* global Flash */
/* global axios */
/* global moment */
/* global AddShift */

$(function() {
    var container = document.querySelector('.add-container');

    container.innerHTML = ShiftTracker.templates.loader();

    var oneShiftSteps = [
        {
            contentPartial: 'date',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {
                return callback(null, {
                    today: moment().format('YYYY-MM-DD')
                });
            },
            validate: function () {
                var date = container.querySelector('.shift__date');
                var dayOrNight = container.querySelector('.shift__day-or-night');

                if (!date.value.match(/^[12][0-9]{3}-[01][0-9]-[0-3][0-9]$/)) { // check if in YYYY-MM-DD format
                    date.focus();
                    Flash.insertFlash('warning', 'Date should be YYYY-MM-DD');

                    return false;
                }

                if (!(dayOrNight.value === 'D' || dayOrNight.value === 'N')) {
                    dayOrNight.focus();
                    Flash.insertFlash('warning', 'Must select day or night for the shift.');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var date = container.querySelector('.shift__date');
                var dayOrNight = container.querySelector('.active .shift__day-or-night');

                validatedData = Object.assign(validatedData, {
                    date: date.value,
                    dayOrNight: dayOrNight.value
                });
            }
        },
        {
            contentPartial: 'staff',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {

                axios
                    .get('/api/staff_member/read_active.php', {
                        params: {
                            date: data.validated.date
                        }
                    })
                    .then(function (response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            return callback(null, {
                                staff: response.data.records
                                    .map(function (record) {
                                        return {
                                            firstName: record.first_name,
                                            lastName: record.last_name,
                                            id: record.id,
                                            categoryId: record.category_id,
                                            categoryName: record.category_name
                                        };
                                    })
                            });
                        }
                    })
                    .catch(function (error) {
                        return callback(error);
                    });
            },
            validate: function () {
                var staff = container.querySelector('.shift__staff');

                if (!staff.value.match(/^[0-9]+$/)) {
                    staff.focus();
                    Flash.insertFlash('warning', 'Choose a staff person for the shift.');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelector('.shift__staff');

                validatedData = Object.assign(validatedData, {
                    staffId: staff.value,
                    category: staff.querySelector('option[value="' + staff.value + '"]').dataset.category
                });
            }
        },
        {
            contentPartial: 'role',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {

                axios
                    .get('/api/role/read.php')
                    .then(function (response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            return callback(null, {
                                roles: response.data.records
                                    .filter(function (record) {
                                        if (data.validated.dayOrNight === 'N') {
                                            if (record.name === 'charge') {
                                                return false;
                                            }
                                        }

                                        if (data.validated.category === 'RN') {
                                            if (record.name === 'nursing attendant') {
                                                return false;
                                            } else if (record.name === 'unit clerk') {
                                                return false;
                                            }
                                        }

                                        if (data.validated.category === 'LPN' || data.category === 'NA') {
                                            if (record.name === 'nursing attendant') {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }


                                        if (data.validated.category === 'UC') {
                                            if (record.name === 'unit clerk') {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }

                                        return true;
                                    })
                            });
                        }
                    })
                    .catch(function (error) {
                        return callback(error);
                    });
            },
            validate: function () {
                var role = container.querySelector('.shift__role');

                if (!role.value.match(/^[0-9]+$/)) {
                    role.focus();
                    Flash.insertFlash('warning', 'Choose a role for the shift.');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var role = container.querySelector('.shift__role');

                validatedData = Object.assign(validatedData, {
                    role: role.value,
                    roleName: role.querySelector('option[value="' + role.value + '"]').innerText
                });
            }
        },
        {
            contentPartial: 'assignment',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {

                axios
                    .get('/api/assignment/read.php')
                    .then(function (response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            return callback(null, {
                                assignments: response.data.records.filter(function (record) {
                                    //filter the assignment records by previously submitted criteria
                                    var list = null;

                                    if (data.validated.roleName === 'clinician') {
                                        if (data.validated.dayOrNight === 'D') {
                                            list = ['A/B', 'B/C'];

                                            if (list.includes(record.name)) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        } else if (data.validated.dayOrNight === 'N') {
                                            list = ['A/B/C'];

                                            if (list.includes(record.name)) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }

                                        return false;

                                    } else if (data.validated.roleName === 'charge') {
                                        if (data.validated.dayOrNight === 'D') {
                                            list = ['A', 'C'];

                                            if (list.includes(record.name)) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        } else if (data.validated.dayOrNight === 'N') {
                                            list = ['A/B/C'];

                                            if (list.includes(record.name)) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }

                                        return false;

                                    } else if (data.validated.roleName === 'nursing attendant') {
                                        list = ['float'];

                                        if (list.includes(record.name)) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    } else if (data.validated.roleName === 'outreach') {
                                        list = ['float'];

                                        if (list.includes(record.name)) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    } else if (data.validated.roleName === 'unit clerk') {
                                        list = ['float'];

                                        if (list.includes(record.name)) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    } else {
                                        return true;
                                    }
                                })
                            });
                        }
                    })
                    .catch(function (error) {
                        return callback(error);
                    });
            },
            validate: function () {
                var assignment = container.querySelector('.shift__assignment');

                if (!assignment.value.match(/^[0-9]+$/)) {
                    assignment.focus();
                    Flash.insertFlash('warning', 'Choose an assignment for the shift.');

                    return false;
                }

                return true;

            }, onvalid: function (validatedData) {
                var assignment = container.querySelector('.shift__assignment');

                validatedData = Object.assign(validatedData, {
                    assignment: assignment.value
                });
            }
        },
        {
            contentPartial: 'mod',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {

                if (data.validated.roleName !== 'bedside') {
                    return callback(null, { hasMods: false });
                } else {
                    axios
                        .get('/api/mod/read.php')
                        .then(function (response) {
                            if (response.data.response === 'ERROR') {
                                throw response.data.message;
                            }

                            if (response.data.response === 'OK') {
                                return callback(null, { hasMods: true, mods: response.data.records });
                            }
                        })
                        .catch(function (error) {
                            return callback(error);
                        });
                }

            },
            validate: function () {
                var staff = container.querySelectorAll('.shift__mod input:checked');

                return true;
            },
            onvalid: function (validatedData) {
                var mods = container.querySelectorAll('.shift__mod input:checked');

                var listOfMods = [];

                for (let i = 0; i < mods.length; i++) {
                    var mod = mods[i];

                    listOfMods.push(mod.value);
                }

                validatedData = Object.assign(validatedData, {
                    mod: listOfMods
                });
            }
        }
    ];

    var addOneShift = AddShift(oneShiftSteps, {
        debug: true,
        container: container,
        templates: {
            show: ShiftTracker.templates.shift.add,
            error: ShiftTracker.templates.shift.error
        }
    });
});