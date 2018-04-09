/* global ShiftTracker */

var ReportGenerator = (function() {
    function init(options) {
        state = options.state;
        
        state.step = 0;
        state.data = {};

        displayStep();
    }

    function prepareData(callback) {
        return state.steps[state.step].prepareData(state.data, callback);
    }

    function submitData() {
        if (state.steps[state.step].submitData) {
            return state.steps[state.step].submitData(state.data);
        }

        return false;
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
        if (state.step - 1 >= 0) {
            state.step -= 1;

            displayStep();
        }
    }

    function displayStep() {
        prepareData(function(err, data) { 
            if (err) {
                state.container.innerHTML = state.error({error: err});
                return;
            }

            var x = Object.assign({
                subtitle: state.steps[state.step].subtitle,
                context: state.steps[state.step].context,
                whichReportPartial: state.steps[state.step].template,
                next: (state.step + 1 < state.steps.length),
                prev: (state.step - 1 >= 0)
            }, state.data);

            console.log({x});
            

            state.container.innerHTML = state.template(x);
        });
    }

    var state = null;

    return {
        init: init,
        next: nextStep,
        prev: prevStep
    };
}());

$(function(){
    var container = document.querySelector('.container.content');
    container.innerHTML = ShiftTracker.templates.report.layout({});

    var options = {
        state: {
            error: ShiftTracker.templates.admin.error,
            template: ShiftTracker.templates.report.layout,
            container: container,
            steps: [
                {
                    subtitle: 'Assignment Report:',
                    context: '1) Choose the date for the report',
                    template: 'report_date',
                    prepareData: function(data, callback) {
                        console.info('preparing data');
                        return callback(null, true);
                    },
                    submitData: function(data) {
                        console.info('submitting data');
                        return true;
                    }  
                },
                {
                    subtitle: 'Assignment Report:',
                    context: '1) Choose the staff for the report',
                    template: 'report_staff',
                    prepareData: function(data, callback) {
                        console.info('preparing data');
                        return callback(null, true);
                    },
                    submitData: function(data) {
                        console.info('submitting data');
                        return true;
                    }  
                },
                {
                    subtitle: 'Assignment Report:',
                    context: '3) View Report',
                    template: 'report_display_shift',
                    prepareData: function(data, callback) {
                        console.info('preparing data');
                        return callback(null, true);
                    },
                    submitData: function(data) {
                        return false;
                    }  
                }
            ]
        }
    };

    ReportGenerator.init(options);

    container.addEventListener('click', function(ev) {
        if (ev.target.id === 'prevBtn') {
            ReportGenerator.prev();
        } else if (ev.target.id === 'nextBtn') {
            ReportGenerator.next();
        }
    });
});
