/* global axios */
/* global Flash */
/* global User */

/*
required options:

options.container = where to show the forms
options.templates.show = the partial holder
options.templates.error = the error template

optional options:

options.debug = show verbose console log messges
options.areClickListenersSet = in case want to define custom

steps must be in this format:

steps = [
    {
        contentPartial: 'string', //name of partial to display for the step
        prepare: function(data, callback) {
            //get data for the partial if needed, can use the previous steps collected data

            return callback(err, result);
        },
        validate: function() {
            // validate the content partial, tightly coupled to the partial format

            return true; // or false
        },
        onvalid: function(submissionData) {
            // assuming the form is valid, collect the data, add it to the submissionData
        }
    },
    ...
]
*/

var AddShift = function (steps, options) {
    options = options || {};

    var templates = options.templates || {};
    templates.show = templates.show || null;
    templates.error = templates.error || null;
    templates.summary = templates.summary || null;

    templates.strings = templates.strings || {};
    templates.strings.link = templates.strings.link || '/shift/add-one-shift.php';

    var container = options.container || null;

    var state = {};
    state.steps = steps;
    state.currentStep = 0;
    state.data = {};
    state.data.prepared = {};
    state.data.validated = {};
    state.debug = options.debug || false;
    state.areClickListenersSet = options.currentStep || false;

    var classLists = {};
    classLists.nextBtn = 'shift-next-step';
    classLists.previousBtn = 'shift-previous-step';
    classLists.submitBtn = 'shift-submit';
    classLists.mod = 'mod-input';
    classLists.activeMod = 'active-mod';

    classLists.btnColors = {};
    classLists.btnColors.primary = 'btn-primary';
    classLists.btnColors.warning = 'btn-warning';

    state.classLists = classLists;

    function displayStaffSearchResult(ev, data) {
        function findMatches(wordToMatch, staff) {
            return staff.filter(s => {
                var re = new RegExp(wordToMatch, 'gi');
                return (s.lastName + ', ' + s.firstName).match(re);
            });
        }

        console.log({ev, data});

        var searchBox = document.querySelector('.staff-search-box');
        var staffList = searchBox.dataset.staffList;
        var searchTerm = searchBox.value;
        var matchArray = findMatches(searchTerm, data.prepared[staffList]);
        var html = '';

        if (searchTerm !== '') {
            html = matchArray.map(function(staff) {
                var re = new RegExp('('+searchTerm+')', 'gi');
                var name = (staff.lastName + ', ' + staff.firstName).replace(re, '<span class="search-hl">$1</span>');

                return '<li class="staff-search-item" data-staff-id="'+staff.id+'">'+name+'</li>\n';
            }).join('');
        }

        document.querySelector('.staff-search-suggestions').innerHTML = html;
    }

    function selectStaffOption(id) {
        var optionElem = container.querySelector('option[value="'+id+'"]');

        if (optionElem) {
            optionElem.selected = true;

            //emit synthetic change event
            var event = document.createEvent('Event');
            event.initEvent('change', true, true);
            optionElem.parentNode.dispatchEvent(event);
        }
    }

    //Set the click listeners
    if (!state.areClickListenersSet) {

        container.addEventListener('change', function(ev) {
            if (ev.target.classList.contains('shift__clinician-pod')) {
                var clinicianPodName = ev.target.selectedOptions[0].dataset.assignment;

                var mainPod = clinicianPodName.replace(/[B\/]/g, ''); // eslint-disable-line no-useless-escape

                if (mainPod === 'A') {
                    document.getElementById('charge-pod-select').querySelector('option[data-assignment="C"]').selected = true;
                    // document.querySelector('.shift__charge-pod option[data-assignment="C"]').selected = true;
                } else if(mainPod === 'C') {
                    document.getElementById('charge-pod-select').querySelector('option[data-assignment="A"]').selected = true;
                    // document.querySelector('.shift__charge-pod option[data-assignment="A"]').selected = true;
                }
            } else if (ev.target.classList.contains('shift__charge-pod')) {
                var chargePodName = ev.target.selectedOptions[0].dataset.assignment;

                if (chargePodName === 'A') {
                    document.getElementById('clinician-pod-select').querySelector('option[data-assignment="B/C"]').selected = true;
                    // document.querySelector('.shift__clinician-pod option[data-assignment="B/C"]').selected = true;
                } else if (chargePodName === 'C') {
                    document.getElementById('clinician-pod-select').querySelector('option[data-assignment="A/B"]').selected = true;
                    // document.querySelector('.shift__clinician-pod option[data-assignment="A/B"]').selected = true;
                }
            } else if (ev.target.classList.contains('select-count-data')) {
                var selectCount = ev.target.querySelectorAll('option:checked').length;

                container.querySelector('.select-count').innerHTML = '('+selectCount+' staff selected)';
            }

            // else if (ev.target.classList.contains('staff-search-box')) {
            //    displayStaffSearchResult(ev, state.data);
            // }

            return false;
        });

        container.addEventListener('keyup', function(ev) {
            if (ev.target.classList.contains('staff-search-box')) {
                displayStaffSearchResult(ev, state.data);
            }
        });

        document.addEventListener('click', function(ev) {
            var target = ev.target;

            if (target.classList.contains('staff-search-box')) {
                displayStaffSearchResult(ev, state.data);
            } else if (
                target.classList.contains('staff-search-item') ||
                target.classList.contains('search-hl')
            ) {
                if (target.classList.contains('search-hl')) {
                    target = target.parentNode;
                }

                var staffId = target.dataset.staffId;

                selectStaffOption(staffId);
                var inputBox = document.querySelector('.staff-search-box');
                inputBox.value = '';
                inputBox.focus();

                document.querySelector('.staff-search-suggestions').innerHTML = '';
            } else {
                var suggestions = document.querySelector('.staff-search-suggestions');

                if (suggestions) {
                    suggestions.innerHTML = '';
                }
            }
        });

        container.addEventListener('click', function (ev) {
            if (state.debug) console.log({event: ev, target: ev.target, classList: ev.target.classList});

            var target = ev.target;

            if (target.classList.contains(classLists.nextBtn)) {
                nextStep(state);
            } else if (target.classList.contains(classLists.previousBtn)) {
                previousStep(state);
            } else if (target.classList.contains(classLists.submitBtn)) {
                submit(state);
            } else if (target.classList.contains(classLists.mod)) {
                target.parentNode.classList.toggle(classLists.activeMod);
            }
        });

        window.addEventListener('keydown', function(ev) {
            // console.log(ev);

            if (ev.key === 'Enter') {

                if (ev.target.classList.contains('staff-search-box') && (ev.target.value.length > 0)) {
                    var staffItem = document.querySelector('.staff-search-suggestions li:first-child');

                    if (staffItem) {
                        selectStaffOption(staffItem.dataset.staffId);
                        ev.target.value = '';
                    }
                } else {
                    var isNextStep = !document.querySelector('.'+classLists.nextBtn).disabled;

                    if (isNextStep) {
                        nextStep(state);
                    } else {
                        submit(state);
                    }
                }
            }
        });

        container.addEventListener('mousedown', function(ev) {
            if (ev.target.localName === 'option' && ev.target.parentNode.multiple) {
                ev.preventDefault();

                var originalScrollTop = ev.target.parentNode.scrollTop;
                // console.log(originalScrollTop);

                ev.target.selected = ev.target.selected ? false : true;

                ev.target.parentNode.focus();
                setTimeout(function () {
                    ev.target.parentNode.scrollTop = originalScrollTop;
                }, 0);

                //emit synthetic change event
                var event = document.createEvent('Event');
                event.initEvent('change', true, true);
                ev.target.parentNode.dispatchEvent(event);
            }

            return false;
        });

        state.areClickListenersSet = true;
    }

    var reset = function reset() {
        state.currentStep = 0;
        state.data = {};
        state.data.prepared = {};
        state.data.validated = {};

        showCurrentStep({ isPreviousStep: false, isNextStep: true, isSubmitStep: false });
    };

    var showCurrentStep = function showCurrentStep(data) {
        if (state.debug) {
            console.log('show', {data: state.data, currentStep: state.currentStep, stepData: data});
        }

        function toggleNext(buttonState) {
            document.querySelector('.'+classLists.nextBtn).disabled = !buttonState;
        }

        function togglePrevious(buttonState) {
            document.querySelector('.' +classLists.previousBtn).disabled = !buttonState;
        }

        function toggleSubmit(buttonState) {
            var submit = document.querySelector('.' +classLists.submitBtn);
            submit.disabled = !buttonState;

            setTimeout(function () {
                if (buttonState) {
                    submit.classList.remove(classLists.btnColors.primary);
                    submit.classList.add(classLists.btnColors.warning);
                }
            }, 100);
        }

        function focusFirstInput() {
            var firstInput = container.querySelector('input:nth-of-type(1):not([readonly]):not([type="hidden"]), select:nth-of-type(1)');

            if (firstInput) {
                firstInput.focus();
            }
        }

        state.steps[state.currentStep].prepare(state.data, function (err, result) {
            if (err) {
                console.error(err);
                container.innerHTML = templates.error({ errorMsg: 'problem displaying this step, <a href="'+templates.strings.link+'">reload.</a>' });

                toggleNext(false);
                togglePrevious(false);
                toggleSubmit(false);

                return;
            }

            console.log('✨',{data: state.data, result});

            Object.assign(state.data.prepared, result);

            container.innerHTML = templates.show(Object.assign({
                whichContentPartial: 'add_shift_' + state.steps[state.currentStep].contentPartial,
                step: state.currentStep + 1,
                totalSteps: state.steps.length
            }, data, state.data.prepared, state.data.validated));


            window.scrollTo(0,0);

            focusFirstInput();

            toggleNext(data.isNextStep);
            togglePrevious(data.isPreviousStep);
            toggleSubmit(data.isSubmitStep);
        });
    };

    var nextStep = function nextStep(state) {
        if (state.debug) {
            console.log('next', { data: state.data, currentStep: state.currentStep });
        }

        if (state.currentStep !== null && state.currentStep < (state.steps.length - 1)) {
            // validate current step
            if (!state.steps[state.currentStep].validate()) {
                return;
            }

            // if valid, gather the data to be submitted
            state.steps[state.currentStep].onvalid(state.data.validated);

            state.currentStep += 1;

            while (state.steps[state.currentStep].skippable && state.steps[state.currentStep].checkIfShouldSkip(state.data)) {
                state.currentStep += 1;
            }

            var previous = true;
            var next = ((state.currentStep + 1) < state.steps.length);
            var submit = ((state.currentStep + 1) >= state.steps.length);

            showCurrentStep({ isPreviousStep: previous, isNextStep: next, isSubmitStep: submit });
        }
    };

    var previousStep = function previousStep(state) {
        if (state.debug) {
            console.log('previous', { data: state.data, currentStep: state.currentStep });
        }

        if (state.currentStep !== null && state.currentStep > 0) {
            state.currentStep -= 1;

            while (state.steps[state.currentStep].skippable && state.steps[state.currentStep].checkIfShouldSkip(state.data)) {
                state.currentStep -= 1;
            }

            var previous = (state.currentStep > 0);
            var next = true;
            var submit = false;

            showCurrentStep({ isPreviousStep: previous, isNextStep: next, isSubmitStep: submit });
        }
    };

    var submit = options.submit || function (state) {
        if (state.debug) {
            console.log('submit', { dataSoFar: state.data, currentStep: state.currentStep });
        }

        var submit = document.querySelector('.'+classLists.submitBtn);

        submit.disabled = true;

        // validate current step
        // -- steps[currentStep].validate()

        if (!state.steps[state.currentStep].validate()) {
            return;
        }

        // if valid, gather the data to be submitted
        // -- steps[currentStep].isvalid()

        state.steps[state.currentStep].onvalid(state.data);

        if (state.debug) {
            console.log('submitting', { dataSoFar: state.data, currentStep: state.currentStep });
        }

        axios
            .post('/api/shift/create.php', {
                shift_date: state.data.validated.date,
                shift_d_or_n: state.data.validated.dayOrNight,
                staff_id: state.data.validated.staffId,
                role_id: state.data.validated.role,
                assignment_id: state.data.validated.assignment,
                created_by: User.name,
                mods: state.data.validated.mod
            })
            .then(function (response) {
                var data = response.data;

                if (data.response !== 'OK') {
                    throw 'problem creating the entry: ' + data.message;
                }

                if (!data.created) {
                    throw 'problem creating the entry ' + data.message;
                }

                submit.disabled = false;
                Flash.insertFlash('success', 'Shift created! Nice work!');
                reset(); //restart the form
            })
            .catch(function (error) {
                alert('An error occured, attempt to resubmit, reload, or try again later');
                console.error(error);
                submit.disabled = false;
            });
    };

    showCurrentStep({ isPreviousStep: false, isNextStep: true, isSubmitStep: false });

    return {
        reset: reset,
        nextStep: nextStep,
        previousStep: previousStep,
        submit: submit,
        state: state
    };
};
