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
                                staffGroups: groups,
                                staffForClinicianPick : groups.rn
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
                    staffForChargePick: data.prepared.staffForClinicianPick
                        .filter(function(s) {
                            if (s.id === data.validated.clinicianId) { 
                                return false;
                            }

                            return true;
                        })
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
                if (!data.prepared.mods) {
                    return callback('no mods, an error has occured.');
                }

                return callback(null, { 
                    assignmentForClinicianPodPick: data.prepared.assignments
                        .filter(function(a) {
                            if (
                                a.name === 'A/B' ||
                                a.name === 'B/C'
                            ) {
                                return true;
                            }

                            return false;
                        }),
                    assignmentForChargePodPick: data.prepared.assignments
                        .filter(function (a) {
                            if (
                                a.name === 'A' ||
                                a.name === 'C'
                            ) {
                                return true;
                            }

                            return false;
                        })
                });
            },
            validate: function () {
                var clinicianPod = document.querySelector('.shift__clinician-pod');
                var chargePod = document.querySelector('.shift__charge-pod');

                if (!clinicianPod.value || !chargePod.value) {
                    if (!clinicianPod.value) {
                        clinicianPod.focus();
                    } else {
                        chargePod.focus();
                    }

                    Flash.insertFlash('warning', 'Choose assignments for both the clinician and the charge nurse.');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var clinicianPod = document.querySelector('.shift__clinician-pod');
                var chargePod = document.querySelector('.shift__charge-pod');

                validatedData = Object.assign(validatedData, { 
                    clinicianAssignmentId: clinicianPod.value,
                    chargeAssignmentId: chargePod.value
                });
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
                    staffPicks = data.prepared.staffForChargePick.filter(function (s) {
                        if (s.id === data.validated.chargeId) {
                            return false;
                        }

                        return true;
                    });
                } else if (data.validated.dayOrNight === 'N') {
                    staffPicks = data.prepared.staffForClinicianPick.filter(function (s) {
                        if (s.id === data.validated.clinicianId) {
                            return false;
                        }

                        return true;
                    });
                }

                return callback(null, {
                    staffForBedsidePick: staffPicks
                });
            },
            validate: function () {
                var staff = container.querySelector('.shift__bedside');
                var selected = staff.querySelectorAll('option:checked');

                if (selected.length < 1) {
                    staff.focus();
                    Flash.insertFlash('warning', 'Need to select at least one staff for the bedside');

                    return false;
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.shift__bedside option:checked');

                var bedsides = Array.prototype.slice.call(staff).map(function(s) {
                    return s.value;
                });

                validatedData = Object.assign(validatedData, {
                    bedsideIds: bedsides
                });
            }
        },
        {
            contentPartial: 'bedside_pods',
            skippable: true,
            checkIfShouldSkip: function (data) {
                if (data.validated.bedsideIds.length < 1) {
                    return true;
                }

                return false;
            },
            prepare: function (data, callback) {
                if (!data.prepared.staffGroups.rn) {
                    return callback('no mods, an error has occured.');
                }

                return callback(null, {
                    staffPickedForBedside: data.prepared.staffGroups.rn.filter(function(staff) {
                        if (data.validated.bedsideIds.includes(staff.id)) {
                            return true;
                        }

                        return false;
                    }),
                    assignmentsForBedside: data.prepared.assignments.filter(function(assignment) {
                        if (
                            assignment.name === 'A' ||
                            assignment.name === 'B' ||
                            assignment.name === 'C'
                        ) {
                            return true;
                        }

                        return false;
                    })
                    
                });
            },
            validate: function () {
                var staff = container.querySelectorAll('.bedside-staff-member');

                for (var i = 0; i < staff.length; i++) {
                    var s = staff[i];
                    
                    var checkedPod = s.querySelector('input:checked');

                    if (!checkedPod) {
                        Flash.insertFlash('warning', 'You must select an assignment for "'+s.querySelector('span:first-child').innerText.trim()+'"!');
                        var pods = s.querySelectorAll('.pod-assignment');

                        for (var j = 0; j < pods.length; j++) {
                            var pod = pods[j];
                            
                            pod.classList.add('attention');
                        }

                        return false;
                    }
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.bedside-staff-member');
                var bedsideAssignments = [];
                
                for (var i = 0; i < staff.length; i++) {
                    var s = staff[i];

                    var checkedPod = s.querySelector('input:checked').value;

                    bedsideAssignments.push({
                        staffId: s.dataset.staffId,
                        assignmentId: checkedPod
                    });
                }

                validatedData = Object.assign(validatedData, {
                    bedsideAssignments: bedsideAssignments
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
                    staffForOutreachPick: data.prepared.staffForBedsidePick.filter(function (s) {
                        if (data.validated.bedsideIds.includes(s.id)) {
                            return false;
                        }

                        return true;
                    })            
                });
            },
            validate: function () {
                var staff = container.querySelector('.shift__outreach');
                var selected = staff.querySelector('option:checked');

                if (!selected) {
                    staff.focus();
                    Flash.insertFlash('warning', 'Choose an outreach person for the shift.');

                    return false;
                }

                return true;

            },
            onvalid: function (validatedData) {
                var staff = container.querySelector('.shift__outreach option:checked');

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
                data.prepared.staffGroups.lpn = data.prepared.staffGroups.lpn || [];
                data.prepared.staffGroups.na = data.prepared.staffGroups.na || [];

                return callback(null, {
                    staffForAttendantPick: data.prepared.staffGroups.lpn.concat(data.prepared.staffGroups.na)
                });
            },
            validate: function () {
                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.shift__attendants option:checked');

                staff = staff || [];
                staff = Array.prototype.slice.call(staff);

                var attendants = staff.map(function (s) {
                    return s.value;
                });

                validatedData = Object.assign(validatedData, {
                    attendantIds: attendants
                });
            }
        },
        {
            contentPartial: 'attendant_pods',
            skippable: true,
            checkIfShouldSkip: function (data) {
                if (data.validated.attendantIds.length < 1) {
                    return true;
                }

                return false;
            },
            prepare: function (data, callback) {
                if (!(data.prepared.staffGroups.lpn || data.prepared.staffGroups.na)) {
                    return callback('no lpn or na, an error has occured.');
                }

                return callback(null, {
                    staffPickedForAttendants: data.prepared.staff.groups.lpn
                        .concat(data.prepared.staff.groups.na)
                        .filter(function(staff) {
                            if (data.validated.attendantIds.includes(staff.id)) {
                                return true;
                            }

                            return false;
                        }),
                    assignmentsForAttendant: data.prepared.assignments.filter(function(assignment) {
                        if (
                            assignment.name === 'A' ||
                            assignment.name === 'B' ||
                            assignment.name === 'C' ||
                            assignment.name === 'A/B' ||
                            assignment.name === 'B/C' ||
                            assignment.name === 'A/C' ||
                            assignment.name === 'A/B/C'
                        ) {
                            return true;
                        }

                        return false;
                    })
                    
                });
            },
            validate: function () {
                var staff = container.querySelectorAll('.attendant-staff-member');

                for (var i = 0; i < staff.length; i++) {
                    var s = staff[i];
                    
                    var checkedPod = s.querySelector('input:checked');

                    if (!checkedPod) {
                        Flash.insertFlash('warning', 'You must select an assignment for "'+s.querySelector('span:first-child').innerText.trim()+'"!');
                        var pods = s.querySelectorAll('.pod-assignment');

                        for (var j = 0; j < pods.length; j++) {
                            var pod = pods[j];
                            
                            pod.classList.add('attention');
                        }

                        return false;
                    }
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.attendant-staff-member');
                var attendantAssignments = [];
                
                for (var i = 0; i < staff.length; i++) {
                    var s = staff[i];

                    var checkedPod = s.querySelector('input:checked').value;

                    attendantAssignments.push({
                        staffId: s.dataset.staffId,
                        assignmentId: checkedPod
                    });
                }

                validatedData = Object.assign(validatedData, {
                    attendantAssignments: attendantAssignments
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
                data.prepared.staffGroups.uc = data.prepared.staffGroups.uc || [];

                return callback(null, {
                    staffForClerkPick: data.prepared.staffGroups.uc
                });
            },
            validate: function () {
                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.shift__clerks option:checked');

                staff = staff || [];
                staff = Array.prototype.slice.call(staff);

                var clerks = staff.map(function (s) {
                    return s.value;
                });

                validatedData = Object.assign(validatedData, {
                    clerkIds: clerks
                });
            }
        },
        {
            contentPartial: 'clerk_pods',
            skippable: true,
            checkIfShouldSkip: function (data) {
                if (data.validated.clerkIds.length < 1) {
                    return true;
                }

                return false;
            },
            prepare: function (data, callback) {
                if (!(data.prepared.staffGroups.uc)) {
                    return callback('no uc, an error has occured.');
                }

                return callback(null, {
                    staffPickedForClerks: data.prepared.staff.groups.uc
                        .filter(function(staff) {
                            if (data.validated.clerkIds.includes(staff.id)) {
                                return true;
                            }

                            return false;
                        }),
                    assignmentsForClerk: data.prepared.assignments.filter(function(assignment) {
                        if (
                            assignment.name === 'A' ||
                            assignment.name === 'B' ||
                            assignment.name === 'C' ||
                            assignment.name === 'A/B/C'
                        ) {
                            return true;
                        }

                        return false;
                    })
                    
                });
            },
            validate: function () {
                var staff = container.querySelectorAll('.clerk-staff-member');

                for (var i = 0; i < staff.length; i++) {
                    var s = staff[i];
                    
                    var checkedPod = s.querySelector('input:checked');

                    if (!checkedPod) {
                        Flash.insertFlash('warning', 'You must select an assignment for "'+s.querySelector('span:first-child').innerText.trim()+'"!');
                        var pods = s.querySelectorAll('.pod-assignment');

                        for (var j = 0; j < pods.length; j++) {
                            var pod = pods[j];
                            
                            pod.classList.add('attention');
                        }

                        return false;
                    }
                }

                return true;
            },
            onvalid: function (validatedData) {
                var staff = container.querySelectorAll('.clerk-staff-member');
                var clerkAssignments = [];
                
                for (var i = 0; i < staff.length; i++) {
                    var s = staff[i];

                    var checkedPod = s.querySelector('input:checked').value;

                    clerkAssignments.push({
                        staffId: s.dataset.staffId,
                        assignmentId: checkedPod
                    });
                }

                validatedData = Object.assign(validatedData, {
                    clerkAssignments: clerkAssignments
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
            onvalid: function (validatedData) {

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
        debug: false,
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