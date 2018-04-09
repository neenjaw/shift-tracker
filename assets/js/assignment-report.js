/* global ShiftTracker */

var ReportGenerator = function(options) {

    /*
    {
        steps: [
            {
                template: ShiftTracker
                prepareData: function(data, callback) {

                } 
            }
        ]
    }
    */

    function init() {
        state.step = 0;
        state.data = {};

        displayStep();
    }

    function prepareData(callback) {
        return state.steps[state.step].prepareData(state.data, callback);
    }

    function submitData() {
        if (state.steps[state.step].submitData) {
            state.steps[state.step].submitData(state.data);
        }
    }

    function nextStep() {
        if (state.step + 1 < state.steps.length) {
            if (!submitData()) {
                return;
            }

            state.step += 1;

            displayStep();
        }
    }

    function prevStep() {
        if (state.step - 1 > 0) {
            state.step -= 1;

            displayStep();
        }
    }

    function displayStep() {
        prepareData(function(err, data) { 
            if (err) {
                state.container.innerHTML = state.error.template({error: err});
                return;
            }

            state.container.innerHTML = state.template(Object.assign({
                whichReportPartial: state.steps[state.step].template,
                next: (state.step + 1 < state.steps.length),
                prev: (state.step - 1 > 0)
            }, state.data));
        });
    }

    var state = options.state;

    init();

    return {

    };
};

$(function(){
    console.log('connected');
    
    var container = document.querySelector('.container.content');
    container.innerHTML = ShiftTracker.templates.report.layout({});
});
