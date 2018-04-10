/* global axios */
/* global Flash */
/* global moment */
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
            return state.steps[state.step].submitData(state.container, state.data);
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

            Object.assign(state.data, data);

            var x = Object.assign({
                subtitle: state.steps[state.step].subtitle,
                context: state.steps[state.step].context,
                whichReportPartial: state.steps[state.step].template,
                next: (state.step + 1 < state.steps.length),
                prev: (state.step - 1 >= 0)
            }, state.data);

            // console.log({x});

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
                    subtitle: 'Assignment Report',
                    context: '1) Choose the date for the report',
                    template: 'report_date',
                    prepareData: function(data, callback) {
                        return callback(null, {prepared: true});
                    },
                    submitData: function(container, data) {
                        var dateStr = container.querySelector('#date').value;

                        if (dateStr.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
                            data.date = dateStr;
                            
                            delete data.selectedStaffIds;

                            return true;
                        }

                        return false;
                    }  
                },
                {
                    subtitle: 'Assignment Report',
                    context: '2) Choose the staff for the report',
                    template: 'report_staff',
                    prepareData: function(data, callback) {
                        console.info('preparing data');

                        axios
                            .get('/api/staff_member/read_active.php', {
                                params: {
                                    date: data.date
                                }
                            })
                            .then(function(result) {
                                var data = result.data;

                                if (data.response !== 'OK') {
                                    throw data.message;
                                } 

                                return callback(null, {
                                    prepared: true,
                                    staffMembers: data.records
                                });
                            })
                            .catch(function(error) {
                                return callback(error);
                            });
                    },
                    submitData: function(container, data) {
                        console.info('submitting data');

                        var selectedOptions = container.querySelectorAll('option:checked');
                        var selectedStaffIds = [];

                        if (selectedOptions.length === 0) {
                            Flash.insertFlash('warning', 'You must select at least one staff member for the report to be generated.');
                            return false;
                        }

                        for (var index = 0; index < selectedOptions.length; index++) {
                            var option = selectedOptions[index];
                            
                            selectedStaffIds.push(option.value);
                        }

                        data.selectedStaffIds = selectedStaffIds;

                        return true;
                    }  
                },
                {
                    subtitle: 'Assignment Report',
                    context: '3) View Report',
                    template: 'report_display_shift',
                    prepareData: function(data, callback) {
                        function makeStaffEntry(record) {
                            return {
                                first_name: record.staff_first_name,
                                last_name: record.staff_last_name,
                                id: record.staff_id,
                                category: record.staff_category_name,
                                shifts: [],
                                assignments: [],
                                roles: [],
                                mods: [],
                                dayCount: 0
                            };
                        }

                        function makeAssignmentEntry(record) {
                            return {
                                id: record.assignment_id,
                                name: record.assignment_name,
                                count: 0
                            };
                        }

                        function makeRoleEntry(record) {
                            return {
                                id: record.role_id,
                                name: record.role_name,
                                count: 0
                            };
                        }

                        function makeModEntry(mod) {
                            return {
                                id: mod.mod_id,
                                name: mod.mod_name,
                                count: 0
                            };
                        }

                        function processRecord(staff, record) {
                            staff.shifts.push(record);

                            staff.assignments[record.assignment_id] = staff.assignments[record.assignment_id] || makeAssignmentEntry(record);
                            staff.assignments[record.assignment_id].count += 1;

                            staff.roles[record.role_id] = staff.roles[record.role_id] || makeRoleEntry(record);
                            staff.roles[record.role_id].count += 1;

                            if (record.shift_mods) {
                                for (var index = 0; index < record.shift_mods.length; index++) {
                                    var mod = record.shift_mods[index];
                                    
                                    staff.mods[mod.mod_id] = staff.mods[mod.mod_id] || makeModEntry(mod);
                                    staff.mods[mod.mod_id].count += 1;
                                }
                            }

                            if (record.shift_d_or_n === 'D') staff.dayCount += 1;
                        }

                        console.info('preparing data');

                        axios
                            .get('/api/shift/read_shifts_for_staff_members.php', {
                                params: {
                                    date_to: data.date,
                                    date_from: moment(data.date, 'YYYY-MM-DD').subtract(8, 'weeks').format('YYYY-MM-DD'),
                                    staff_ids: data.selectedStaffIds
                                }
                            })
                            .then(function(result) {
                                var data = result.data;

                                // console.info({data});

                                if (data.response !== 'OK') {
                                    throw data.message;
                                } 

                                var staff = [];
                                var groups = {};

                                data.records.forEach(function(record) { 
                                    if (staff[record.staff_id] === undefined) {
                                        staff[record.staff_id] = makeStaffEntry(record); 
                                        
                                        groups[record.staff_category_name] = groups[record.staff_category_name] || [];
                                        groups[record.staff_category_name].push(staff[record.staff_id]);
                                    } 
                                    processRecord(staff[record.staff_id], record);
                                });

                                return callback(null, {
                                    prepared: true,
                                    groups: groups
                                });
                            })
                            .catch(function(error) {
                                console.error(error);
                                
                                return callback(error);
                            });
                    },
                    submitData: function(container, data) {
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

    container.addEventListener('mousedown', function(ev) {
        if (ev.target.localName === 'option' && ev.target.parentNode.multiple) {
            ev.preventDefault();
                    
            var originalScrollTop = ev.target.parentNode.scrollTop;

            ev.target.selected = ev.target.selected ? false : true;
            ev.target.parentNode.focus();

            setTimeout(function () {
                ev.target.parentNode.scrollTop = originalScrollTop;
            }, 0);
        }

        return false;
    });
});