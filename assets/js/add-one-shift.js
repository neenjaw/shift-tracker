/* global ShiftTracker */
/* global Flash */
/* global axios */
/* global moment */

$(function() {
    var container = document.querySelector('.add-container');

    container.innerHTML = ShiftTracker.templates.loader();

    AddShiftPage.init({container: container});
});

var AddShiftPage = (function() {
    var container = null;
    var currentStep = null;
    var submissionData = null;
    var areClickListenersSet = false;

    var steps = [
        {
            contentPartial: 'date',
            prepare: function (callback) {
                if(isFunction(callback)) {
                    return callback(null, {
                        today: moment().format('YYYY-MM-DD')
                    });
                }
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
            onvalid: function () {
                var date = container.querySelector('.shift__date');
                var dayOrNight = container.querySelector('.active .shift__day-or-night');

                submissionData = Object.assign(submissionData, {
                    date: date.value,
                    dayOrNight: dayOrNight.value
                });
            }
        },
        { 
            contentPartial: 'staff',
            prepare: function (callback) {

                axios
                    .get('/api/staff_member/read_active.php', {
                        params: {
                            date: submissionData.date
                        }
                    })
                    .then(function(response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            if (isFunction(callback)) {
                                return callback(null, { 
                                    staff: response.data.records
                                        .map(function(record) {
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
                        }
                    })
                    .catch(function(error) {
                        if (isFunction(callback)) {
                            return callback(error);
                        }
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
            onvalid: function () {
                var staff = container.querySelector('.shift__staff');

                submissionData = Object.assign(submissionData, {
                    staff: staff.value,
                    category: staff.querySelector('option[value="'+staff.value+'"]').dataset.category
                });
            } 
        },
        { 
            contentPartial: 'role',
            prepare: function (callback) {

                axios
                    .get('/api/role/read.php')
                    .then(function (response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            if (isFunction(callback)) {
                                return callback(null, { 
                                    roles :response.data.records
                                        .filter(function (record) {
                                            if (submissionData.dayOrNight === 'N') {
                                                if (record.name === 'charge') {
                                                    return false;
                                                }
                                            } 

                                            if (submissionData.category === 'RN') {
                                                if (record.name === 'nursing attendant') {
                                                    return false;
                                                } else if (record.name === 'unit clerk') {
                                                    return false;
                                                }
                                            }

                                            if (submissionData.category === 'LPN' || submissionData.category === 'NA') {
                                                if (record.name === 'nursing attendant') {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }


                                            if (submissionData.category === 'UC') {
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
                        }
                    })
                    .catch(function (error) {
                        if (isFunction(callback)) {
                            return callback(error);
                        }
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
            onvalid: function () {
                var role = container.querySelector('.shift__role');

                submissionData = Object.assign(submissionData, {
                    role: role.value,
                    roleName: role.querySelector('option[value="'+role.value+'"]').innerText
                });
            } 
        },
        { 
            contentPartial: 'assignment',
            prepare: function (callback) {

                axios
                    .get('/api/assignment/read.php')
                    .then(function (response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            if (isFunction(callback)) {
                                return callback(null, { 
                                    assignments: response.data.records.filter(function(record) {
                                    //filter the assignment records by previously submitted criteria
                                        var list = null;

                                        if (submissionData.roleName === 'clinician') {
                                            if (submissionData.dayOrNight === 'D') {
                                                list = ['A/B', 'B/C'];

                                                if (list.includes(record.name)) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            } else if (submissionData.dayOrNight === 'N') {
                                                list = ['A/B/C'];

                                                if (list.includes(record.name)) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }

                                            return false;

                                        } else if (submissionData.roleName === 'charge') {
                                            if (submissionData.dayOrNight === 'D') {
                                                list = ['A', 'C'];

                                                if (list.includes(record.name)) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            } else if (submissionData.dayOrNight === 'N') {
                                                list = ['A/B/C'];

                                                if (list.includes(record.name)) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }

                                            return false;

                                        } else if (submissionData.roleName === 'nursing attendant') {
                                            list = ['float'];

                                            if (list.includes(record.name)) {
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        } else if (submissionData.roleName === 'outreach') {
                                            list = ['float'];

                                            if (list.includes(record.name)) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        } else if (submissionData.roleName === 'unit clerk') {
                                            list = ['float'];

                                            if (list.includes(record.name)) {
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        } else {
                                            return true;
                                        }
                                    })});
                            }
                        }
                    })
                    .catch(function (error) {
                        if (isFunction(callback)) {
                            return callback(error);
                        }
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

            }, onvalid: function () {
                var assignment = container.querySelector('.shift__assignment');

                submissionData = Object.assign(submissionData, {
                    assignment: assignment.value
                });
            } 
        },
        { 
            contentPartial: 'mod',
            prepare: function (callback) {

                axios
                    .get('/api/mod/read.php')
                    .then(function (response) {
                        if (response.data.response === 'ERROR') {
                            throw response.data.message;
                        }

                        if (response.data.response === 'OK') {
                            if (isFunction(callback)) {
                                return callback(null, { mods: response.data.records });
                            }
                        }
                    })
                    .catch(function (error) {
                        if (isFunction(callback)) {
                            return callback(error);
                        }
                    });
            },
            validate: function () { 
                var staff = container.querySelectorAll('.shift__mod input:checked');

                return true;
            }, 
            onvalid: function () {
                var mods = container.querySelectorAll('.shift__mod input:checked');

                var listOfMods = [];

                for (let i = 0; i < mods.length; i++) {
                    var mod = mods[i];
                    
                    listOfMods.push(mod.value);
                }

                submissionData = Object.assign(submissionData, {
                    mod: listOfMods
                });
            } 
        }
    ];

    function isFunction(f) {
        // eslint-disable-next-line no-extra-boolean-cast
        return !!(f && f.constructor && f.call && f.apply);
    }

    function init(options) {
        container = options.container;
        currentStep = 0;
        submissionData = {};

        if (!areClickListenersSet) {
            container.addEventListener('click', function(e){
                var target = e.target; 

                if (target.classList.contains('shift-next-step')) {
                    nextStep();
                } else if (target.classList.contains('shift-previous-step')) {
                    previousStep();
                } else if (target.classList.contains('shift-previous-step')) {
                    submit();
                }
            });
        }

        showCurrentStep({previous: false, next: true, submit: false});
    }

    function showCurrentStep(data) {
        // console.log({
        //     currentStep,
        //     submissionData,
        //     data
        // });

        function toggleNext(state) {
            document.querySelector('.shift-next-step').disabled = !state;
        }

        function togglePrevious(state) {
            document.querySelector('.shift-previous-step').disabled = !state;
        }

        function toggleSubmit(state) {
            var submit = document.querySelector('.shift-submit');
            submit.disabled = !state;

            setTimeout(function() {
                if (state) {
                    submit.classList.remove('btn-primary');
                    submit.classList.add('btn-warning');
                }
            }, 100);
        }

        steps[currentStep].prepare(function (err, result) {
            if (err) {
                console.error(err);
                container.innerHTML = ShiftTracker.templates.staff.error({ errorMsg: 'problem displaying this step, <a href="/shift/add-one-shift.php">reload.</a>'});

                toggleNext(false);
                togglePrevious(false);
                toggleSubmit(false);

                return;
            } 

            container.innerHTML = ShiftTracker.templates.shift.add(Object.assign({
                whichContentPartial: 'add_shift_' + steps[currentStep].contentPartial,
                step: currentStep + 1,
                totalSteps: steps.length
            }, data, result));

            toggleNext(data.next);
            togglePrevious(data.previous);
            toggleSubmit(data.submit);
        });
    }

    function nextStep() {
        if (currentStep !== null && currentStep < (steps.length - 1)) {
            // validate current step
            // -- steps[currentStep].validate()

            if (!steps[currentStep].validate()) {
                return;
            }

            // if valid, gather the data to be submitted
            // -- steps[currentStep].isvalid()

            steps[currentStep].onvalid();

            currentStep += 1;

            var previous = true;
            var next = ((currentStep + 1) < steps.length);
            var submit = ((currentStep + 1) >= steps.length);

            showCurrentStep({previous: previous, next: next, submit: submit});
        }
    }

    function previousStep() {
        if (currentStep !== null && currentStep > 0) {
            currentStep -= 1;

            var previous = (currentStep > 0);
            var next = true;
            var submit = false;

            showCurrentStep({ previous: previous, next: next, submit: submit });
        }
    }

    function submit() {

    }

    return {
        init: init,
        nextStep:nextStep,
        previousStep:previousStep
    };
}());