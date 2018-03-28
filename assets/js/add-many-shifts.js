/* global ShiftTracker */

// FIXME: This is based off of add one shift, has not been updated to suit its needs

$(function() {
    var container = document.querySelector('.add-container');

    container.innerHTML = ShiftTracker.templates.loader();
});

var AddShiftPage = (function() {
    var container = null;
    var currentStep = null;
    var submissionData = null;

    var steps = [
        { contentPartial: 'date' },
        { contentPartial: 'staff' },
        { contentPartial: 'role' },
        { contentPartial: 'assignment' },
        { contentPartial: 'mod' }
    ];

    function init(options) {
        container = options.container;
        currentStep = 0;
        submissionData = {};

        showCurrentStep({previous: false, next: true, submit: false});
    }

    function showCurrentStep(data) {
        console.log({currentStep, submissionData});
        
        container.innerHTML = ShiftTracker.templates.shift.add(Object.assign({
            whichContentPartial: 'add_shift_'+steps[currentStep].contentPartial,
            step: currentStep + 1,
            totalSteps: steps.length
        }, data));
    }

    function nextStep() {
        if (currentStep!== null && currentStep < (steps.length - 1)) {
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

            var previous = ((currentStep - 1) > 0);
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