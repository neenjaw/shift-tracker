/* global axios */
/* global Flash */

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

    //Set the click listeners
    if (!state.areClickListenersSet) {
        container.addEventListener('click', function (e) {
            if (state.debug) console.log({event: e, target: e.target, classList: e.target.classList});            

            var target = e.target;

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

        state.steps[state.currentStep].prepare(state.data, function (err, result) {
            if (err) {
                console.error(err);
                container.innerHTML = templates.error({ errorMsg: 'problem displaying this step, <a href="'+templates.strings.link+'">reload.</a>' });

                toggleNext(false);
                togglePrevious(false);
                toggleSubmit(false);

                return;
            }

            Object.assign(state.data.prepared, result);

            container.innerHTML = templates.show(Object.assign({
                whichContentPartial: 'add_shift_' + state.steps[state.currentStep].contentPartial,
                step: state.currentStep + 1,
                totalSteps: state.steps.length
            }, data, state.data.prepared, state.data.validated));

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
                staff_id: state.data.validated.staff,
                role_id: state.data.validated.role,
                assignment_id: state.data.validated.assignment,
                created_by: 'webuser',
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








