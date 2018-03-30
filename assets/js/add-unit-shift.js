/* global ShiftTracker */
/* global Flash */
/* global axios */
/* global moment */
/* global AddShift */

$(function() {
    var container = document.querySelector('.add-container');

    container.innerHTML = ShiftTracker.templates.loader();

    var manyShiftSteps = [
        {
            contentPartial: 'date',
            skippable: false,
            checkIfShouldSkip: null,
            prepare: function (data, callback) {
                axios
                    .all([
                        axios.get('/api/assignment/read.php'),
                        axios.get('/api/role/read.php'),
                        axios.get('/api/mod/read.php')
                    ])
                    .then(axios.spread(function(assignments, roles, mods) {

                        if (
                            assignments.data.response === 'ERROR' ||
                            roles.data.response === 'ERROR' ||
                            mods.data.response === 'ERROR'
                        ) {
                            var messages = [];

                            if (assignments.data.response === 'ERROR') messages.push(assignments.data.message);
                            if (roles.data.response       === 'ERROR') messages.push(roles.data.message);
                            if (mods.data.response        === 'ERROR') messages.push(mods.data.message);

                            throw messages;
                        }

                        if (
                            assignments.data.response === 'OK' &&
                            roles.data.response === 'OK' &&
                            mods.data.response === 'OK'
                        ) {
                            return callback(null, {
                                today: moment().format('YYYY-MM-DD'),
                                assignments: assignments.data.records,
                                roles: roles.data.records,
                                mods: mods.data.records
                            });
                        }
                    }))
                    .catch(function(error) {
                        return callback(error);
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
            contentPartial: 'clinician',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {
                axios
                    .get('/api/staff_member/read_active.php', { params: { date: data.validated.date } })
                    .then(function(response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            var groups = {};

                            response.data.records
                                .map(function (record) {
                                    return {
                                        firstName: record.first_name,
                                        lastName: record.last_name,
                                        id: record.id,
                                        categoryId: record.category_id,
                                        categoryName: record.category_name
                                    };
                                })
                                .forEach(function(record) {
                                    groups[record.categoryName.toLowerCase()] = groups[record.categoryName.toLowerCase()] || [];
                                    groups[record.categoryName.toLowerCase()].push(record);
                                });

                            return callback(null, {
                                staff: {
                                    groups : groups,
                                    forClinicianPick : groups.rn
                                }
                            });
                        }
                    })
                    .catch(function (error) {
                        return callback(error);
                    });
            },
            validate: function () {
                var staff = container.querySelector('.shift__clinician');
                var pick = staff.querySelector('option:checked');

                if (!pick) {
                    staff.focus();
                    Flash.insertFlash('warning', 'Choose a clinician person for the shift.');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelector('.shift__clinician option:checked');

                validatedData = Object.assign(validatedData, {
                    clinicianId: staff.value
                });
            }
        },
        {
            contentPartial: 'charge',
            skippable: true,
            checkIfShouldSkip: function (data) {
                if (data.validated.dayOrNight === 'N') {
                    return true;
                } else {
                    return false;
                }
            },
            prepare: function (data, callback) {
                return callback(null, {
                    staff : {
                        forChargePick: data.prepared.staff.forClinicianPick.filter(function(s) {
                            if (s.id === data.validated.clinicianId) { 
                                return false;
                            }

                            return true;
                        })
                    }
                });
            },
            validate: function () {
                var staff = container.querySelector('.shift__charge');
                var pick = staff.querySelector('option:checked');

                if (!pick) {
                    staff.focus();
                    Flash.insertFlash('warning', 'Choose a charge person for the shift.');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelector('.shift__charge option:checked');

                validatedData = Object.assign(validatedData, {
                    chargeId: staff.value
                });
            }
        },
        {
            contentPartial: 'charge_pod',
            skippable: true,
            checkIfShouldSkip: function (data) {
                if (data.validated.dayOrNight === 'N') {
                    data.validated.clinicianAssignmentId = data.prepared.assignments
                        .find(function (element) {
                            return (element.name === 'A/B/C');
                        }).id;

                    return true;
                } else {
                    return false;
                }                
            },
            prepare: function (data, callback) {

            },
            validate: function () {

            },
            onvalid: function() {

            }
        },
        {
            contentPartial: 'bedside',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {
                var staffPicks;

                if (data.validated.dayOrNight === 'D') {
                    staffPicks = data.prepared.staff.forChargePick.filter(function (s) {
                        if (s.id === data.validated.chargeId) {
                            return false;
                        }

                        return true;
                    });
                } else if (data.validated.dayOrNight === 'N') {
                    staffPicks = data.prepared.staff.forClinicianPick.filter(function (s) {
                        if (s.id === data.validated.clinicianId) {
                            return false;
                        }

                        return true;
                    });
                }

                return callback(null, {
                    staff: {
                        forBedsidePick: staffPicks
                    }
                });
            },
            validate: function () {
                var staff = container.querySelectorAll('.shift__bedside input:checked');

                if (staff.length < 1) {
                    staff.focus();
                    Flash.insertFlash('warning', 'Need to select at least one staff for the bedside');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.shift__bedside bedside input:checked');

                var bedsides = Array.prototype.slice.call(staff).map(function(s) {
                    var pod = s.parentNode.nextElementSibling.querySelector('option:selected').value;

                    return {id: s.value, pod: pod};
                });

                validatedData = Object.assign(validatedData, {
                    bedsides: bedsides
                });
            }
        },
        {
            contentPartial: 'outreach',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {
                return callback(null, {
                    staff: {
                        forOutreachPick: data.prepared.staff.forBedsidePick.filter(function (s) {
                            for (var i = 0; i < data.validated.bedsides.length; i++) {
                                var bedsideId = data.validated.bedsides[i].id;
                                
                                if (bedsideId === s.id) {
                                    return false;
                                }
                            }

                            return true;
                        })
                    }
                });
            },
            validate: function () {
                var staff = container.querySelector('.shift__outreach input:checked');

                if (!staff) {
                    staff.focus();
                    Flash.insertFlash('warning', 'Choose an outreach person for the shift.');

                    return false;
                }

                return true;

            },
            onvalid: function (validatedData) {
                var staff = container.querySelector('.shift__outreach input:checked');

                validatedData = Object.assign(validatedData, {
                    outreachId: staff.value
                });
            }
        },
        {
            contentPartial: 'attendants',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {
                return callback(null, {
                    staff: {
                        forAttendantPick: data.prepared.staff.groups.lpn.concat(data.prepared.staff.groups.na)
                    }
                });
            },
            validate: function () {
                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.shift__attendants attendant input:checked');

                var attendants = Array.prototype.slice.call(staff).map(function (s) {
                    var id = s.value;
                    var pod = s.parentNode.nextElementSibling.querySelector('option:selected').value;

                    return {attendandId: id, assignmentId: pod};
                });

                validatedData = Object.assign(validatedData, {
                    attendants: attendants
                });
            }
        },
        {
            contentPartial: 'clerks',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {
                return callback(null, {
                    staff: {
                        forClerkPick: data.prepared.staff.groups.uc
                    }
                });
            },
            validate: function () {
                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.shift__clerks clerk input:checked');

                var clerks = Array.prototype.slice.call(staff).map(function (s) {
                    var id = s.value;
                    var pod = s.parentNode.nextElementSibling.querySelector('option:selected').value;

                    return { attendandId: id, assignmentId: pod };
                });

                validatedData = Object.assign(validatedData, {
                    clerks: clerks
                });
            }
        },
        {
            contentPartial: 'mods',
            skippable: false,
            checkIfShouldSkip: function (data) {
                return false;
            },
            prepare: function (data, callback) {
                if (!data.prepared.mods) {
                    return callback('no mods, an error has occured.');
                }

                return callback(null, { ready: true });
            },
            validate: function () {
                return true;
            },
            onvalid: function () {

            }
        }
        /*
        {
            contentPartial: '',
            skippable: true,
            checkIfShouldSkip: function (data) {
                
            },
            prepare: function (data, callback) {

            },
            validate: function () {

            },
            onvalid: function() {

            }
        }
        */
    ];


    var addManyShifts = AddShift(manyShiftSteps, {
        debug: true,
        container: container,
        templates: {
            show: ShiftTracker.templates.shift.add,
            error: ShiftTracker.templates.shift.error,
            strings : {
                link : '/shift/add-unit-shift.php'
            }
        },
        submit: function(state) {
            console.log({state});
            
        }
    });
});