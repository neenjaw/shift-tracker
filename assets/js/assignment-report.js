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
        prev: prevStep,
        getState: function() {
            return state;
        }
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

                            staff.roles[record.role_id] = staff.roles[record.role_id] || makeRoleEntry(record);
                            staff.roles[record.role_id].count += 1;

                            if (['bedside', 'nursing attendant', 'unit clerk'].includes(record.role_name)) {
                                staff.assignments[record.assignment_id] = staff.assignments[record.assignment_id] || makeAssignmentEntry(record);
                                staff.assignments[record.assignment_id].count += 1; 
                            }

                            if (record.shift_mods) {
                                for (var index = 0; index < record.shift_mods.length; index++) {
                                    var mod = record.shift_mods[index];
                                    
                                    staff.mods[mod.mod_id] = staff.mods[mod.mod_id] || makeModEntry(mod);
                                    staff.mods[mod.mod_id].count += 1;
                                }
                            }

                            if (record.shift_d_or_n === 'D') staff.dayCount += 1;
                        }

                        function getModAndPodCounts(assignmentDictionary, modDictionary, rn) {
                            var apodNameIds = [];
                            apodNameIds.push(assignmentDictionary['A']); // jshint ignore:line

                            var bpodNameIds = [];
                            bpodNameIds.push(assignmentDictionary['B']); // jshint ignore:line

                            var cpodNameIds = [];
                            cpodNameIds.push(assignmentDictionary['C']); // jshint ignore:line

                            // rn.forEach(function (staff) {
                            // staff.aCount = 
                            // staff.bCount = 
                            // staff.cCount = 
                            // staff.bedsideCount = 
                            // staff.doubleCount =                                
                            // });
                        }

                        console.info('preparing data');

                        axios
                            .all([
                                axios.get('/api/shift/read_shifts_for_staff_members.php', {
                                    params: {
                                        date_to: data.date,
                                        date_from: moment(data.date, 'YYYY-MM-DD').subtract(8, 'weeks').format('YYYY-MM-DD'),
                                        staff_ids: data.selectedStaffIds
                                    }
                                }),
                                axios.get('/api/assignment/read.php'),
                                axios.get('/api/mod/read.php')
                            ])
                            .then(axios.spread(function(shiftResult, assignmentResult, modResult) {
                                var shift = shiftResult.data;
                                var assignment = assignmentResult.data;
                                var mod = modResult.data;

                                // console.info({data});

                                if (shift.response !== 'OK') {
                                    throw shift.message;
                                } 

                                if (assignment.response !== 'OK') {
                                    throw assignment.message;
                                }

                                if (mod.response !== 'OK') {
                                    throw mod.message;
                                }

                                var staff = [];
                                var groups = {};

                                var assignmentDictionary = {};
                                assignment.records.forEach(function(record) {
                                    assignmentDictionary[record.name] = record.id;
                                });

                                var modDictionary = {};
                                mod.records.forEach(function (record) {
                                    modDictionary[record.name] = record.id;
                                });

                                // process all of the shift records to be organized by group -> staff -> shift
                                shift.records.forEach(function(record) { 
                                    if (staff[record.staff_id] === undefined) {
                                        staff[record.staff_id] = makeStaffEntry(record); 
                                        
                                        var groupName = record.staff_category_name.toLowerCase();

                                        groups[groupName] = groups[groupName] || [];
                                        groups[groupName].push(staff[record.staff_id]);
                                    } 
                                    processRecord(staff[record.staff_id], record);
                                });

                                // get the pod counts for each of the RN's
                                if (groups.rn) {
                                    getModAndPodCounts(assignmentDictionary, modDictionary, groups.rn);
                                }

                                return callback(null, {
                                    prepared: true,
                                    groups: groups,
                                    assignmentDictionary: assignmentDictionary,
                                    modDictionary: modDictionary
                                });
                            }))
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

            //emit synthetic change event
            var event = document.createEvent('Event');
            event.initEvent('change', true, true);
            ev.target.parentNode.dispatchEvent(event);
        }

        return false;
    });

    container.addEventListener('change', function(ev) {

        if (ev.target.classList.contains('select-count-data')) {
            var selectCount = ev.target.querySelectorAll('option:checked').length;

            container.querySelector('.select-count').innerHTML = '('+selectCount+' staff selected)';
        }

    });

    window.addEventListener('keydown', function(ev) {
        // console.log(ev);

        if (
            ev.key === 'Enter' &&
            ev.target.classList.contains('staff-search-box') &&
            ev.target.value.length > 0
        ) {
            var staffItem = document.querySelector('.staff-search-suggestions li:first-child');

            if (staffItem) {
                selectStaffOption(staffItem.dataset.staffId);
                ev.target.value = '';
            }
        }
    });

    container.addEventListener('keyup', function(ev) {
        if (ev.target.classList.contains('staff-search-box')) {
            displayStaffSearchResult(ev, ReportGenerator.getState().data);
        }
    });

    function displayStaffSearchResult(ev, data) {
        function findMatches(wordToMatch, staff) {
            return staff.filter(s => {
                var re = new RegExp(wordToMatch, 'gi');
                return (s.last_name + ', ' + s.first_name).match(re);
            });
        }

        console.log({ev, data});

        var searchBox = document.querySelector('.staff-search-box');
        var staffList = searchBox.dataset.staffList;
        var searchTerm = searchBox.value;
        var matchArray = findMatches(searchTerm, data[staffList]);
        var html = '';

        if (searchTerm !== '') {
            html = matchArray.map(function(staff) {
                var re = new RegExp('('+searchTerm+')', 'gi');
                var name = (staff.last_name + ', ' + staff.first_name).replace(re, '<span class="search-hl">$1</span>');

                return '<li class="staff-search-item" data-staff-id="'+staff.id+'">'+name+'</li>\n';
            }).join('');
        }

        document.querySelector('.staff-search-suggestions').innerHTML = html;
    }

    document.addEventListener('click', function(ev) {
        var target = ev.target;

        if (target.classList.contains('staff-search-box')) {
            displayStaffSearchResult(ev, ReportGenerator.getState().data);
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
});

