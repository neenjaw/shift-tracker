/*global axios*/
/*global moment*/
/*global Handlebars*/
/*global ShiftTracker*/
/*global Modal*/

var Shifts = (function () {
    var shiftContainer = document.querySelector('.shift-container');
    var numDaysSpan    = document.querySelector('.number-of-days');

    var numberOfDaysToRetrieve = 15;

    var aPodClass   = 'st-a-pod';
    var bPodClass   = 'st-b-pod';
    var cPodClass   = 'st-c-pod';
    var allPodClass = 'st-all-pod';

    function setNumberOfDaysToRetrieve(num) {
        if (num !== parseInt(num, 10)) {
            return false;
        }

        numberOfDaysToRetrieve = num;
        numDaysSpan.textContent = num;

        return true;
    }

    function getShifts(options) {
        options = options || {};

        var date_to = moment()
            .format('YYYY-MM-DD');

        var date_from = moment()
            .subtract(numberOfDaysToRetrieve - 1, 'days')
            .format('YYYY-MM-DD');

        axios
            .get('/api/shift/read_date_range.php', {
                params: {
                    date_from:date_from,
                    date_to:date_to
                }
            })
            .then(function (response) {
                console.log(response);

                var tableData = formatTableData(response.data);

                options.callback(tableData);
            })
            .catch(function (error) {
                console.log(error);

            });
    }

    function formatTableData(data) {
        function makeShiftCell(shift) {
            var cell = {
                id:    shift.id,
                class: null,
                char:  null,
                charHover: null,
                date:  shift.shift_date,
                staffName: (shift.staff_first_name + ' ' + shift.staff_last_name),
                staffNameReverse: (shift.staff_last_name +', '+ shift.staff_first_name),
                staffId: shift.staff_id,
                staffGroup: shift.staff_category_name
            };

            var a = shift.assignment_name;

            //determine class
            if (a.charAt(0) === 'A' && a.charAt(a.length - 1) !== 'C') {
                cell.class = aPodClass;
            } else if (a.charAt(0) !== 'A' && a.charAt(a.length - 1) === 'C') {
                cell.class = cPodClass;
            } else if (a.indexOf('B') > -1) {
                cell.class = bPodClass;
            } else {
                cell.class = allPodClass;
            }

            //determine char to display
            if (shift.role_name === 'clinician') {
                cell.char = 'C';
                cell.charHover = 'Clinician';
            } else if (shift.role_name === 'charge') {
                cell.char = 'P';
                cell.charHover = 'PRN Charge';
            } else if (shift.role_name === 'outreach') {
                cell.char = 'O';
                cell.charHover = 'Outreach';
            } else if (shift.role_name === 'nursing attendant') {
                cell.char = '✔';
                cell.charHover = 'NA Shift';
            } else if (shift.role_name === 'unit clerk') {
                cell.char = '✔';
                cell.charHover = 'Unit Clerk Shift';
            } else {
                var mods = shift.shift_mods || [];
                var hover = [];
                var hasVent = false;
                var topChar = '';
                var topRank = -1;
                
                for (var index = 0; index < mods.length; index++) {
                    var mod = mods[index];

                    var name = mod.mod_name;
                    var char = '';
                    var rank = -1;

                    if (name === 'burn') {
                        rank = 7;
                        char = 'B';
                        hover.push('Burn');
                    } else if (name === 'crrt') {
                        rank = 6;
                        char = 'R';
                        hover.push('CRRT');
                    } else if (name === 'double') {
                        rank = 5;
                        char = 'D';
                        hover.push('Double');
                    } else if (name === 'evd') {
                        rank = 4;
                        char = 'E';
                        hover.push('EVD');
                    } else if (name === 'admit') {
                        rank = 3;
                        char = 'A';
                        hover.push('Admit');
                    } else if (name === 'vent') {
                        rank = 2;
                        char = 'V';
                        hasVent = true;
                        hover.push('Vent');
                    } else if (name === 'codes') {
                        rank = 1;
                        char = '-';
                        hover.push('Code Pager');
                    }

                    if (rank > topRank) {
                        topRank = rank;
                        topChar = char;
                    }
                }

                if (!hasVent) {
                    hover.push('Non-vent');
                }

                if (topRank === -1) {
                    topChar = 'N';
                }

                cell.char = topChar;
                cell.charHover = hover.join(', ');
            }

            return cell;
        }

        function makeBlankShiftCell(date, staffName) {
            return {
                id: null,
                class: null,
                char: '-',
                charHover: null,
                date: date,
                staffName: staffName
            };
        }

        var startDate = data.date_from;
        var endDate = data.date_to;

        var records = data.records;

        var staffMembers = [];
        var staffMembersIndex = {};

        for (var index = 0; index < records.length; index++) {
            var shift = records[index];
            var staffName = shift.staff_last_name + ', ' + shift.staff_first_name;
            
            if(!(staffName in staffMembersIndex)) {
                var newIndex = staffMembers.push({name: staffName, shifts:[]}) - 1;
                staffMembersIndex[staffName] = newIndex;
            }

            staffMembers[staffMembersIndex[staffName]].shifts.push(makeShiftCell(shift));
        }

        console.log(staffMembers);
        

        var formatted = { 
            dates: [],
            groups: [
                {
                    name: 'RN',
                    staff: []
                },
                {
                    name: 'LPN',
                    staff: []
                },
                {
                    name: 'NA',
                    staff: []
                },
                {
                    name: 'UC',
                    staff: []
                }
            ]
        };

        formatted.dates.push(startDate);

        var momentDate = moment(startDate, 'YYYY-MM-DD').add(1, 'days');

        while (momentDate.isSameOrBefore(endDate)) {
            formatted.dates.push(momentDate.format('YYYY-MM-DD'));
            momentDate.add(1, 'days');
        }

        var group = {
            RN: formatted.groups[0].staff,
            LPN: formatted.groups[1].staff,
            NA: formatted.groups[2].staff,
            UC: formatted.groups[3].staff,
        };

        for (var i = 0; i < staffMembers.length; i++) {
            var staff = staffMembers[i];
            var shifts = staff.shifts;

            var formattedStaff = {
                name: shifts[0].staffName,
                nameReverse: shifts[0].staffNameReverse,
                id: shifts[0].staffId,
                group: shifts[0].staffGroup,
                shifts: []
            };

            // add the staff to the proper formatted group
            group[formattedStaff.group].push(formattedStaff);

            for (var j = 0; j < formatted.dates.length; j++) {
                var date = formatted.dates[j];
                
                //check if the date matches the shift date, if it does then add it to the staff's group entry
                if (shifts.length > 0 && shifts[0].date === date) {
                    formattedStaff.shifts.push(shifts.shift());
                } else {
                    // if not, create a blank cell to display, and insert that
                    formattedStaff.shifts.push(makeBlankShiftCell(date, formattedStaff.name));
                }
            }
        }

        console.log(formatted);
        
        return formatted;        
    }

    return {
        setNumberOfDaysToRetrieve: setNumberOfDaysToRetrieve,
        formatTableData:           formatTableData,
        getShifts:                 getShifts
    };
}());

function showShiftModal() {
    function setupShiftModal() {
        var showEdits = document.querySelectorAll('a[data-show]');
        var hideEdits = document.querySelectorAll('button[data-hide]');

        var currentRole = document.querySelector('.role-name');
        var rForm = document.querySelector('#role-edit');
        var rSelect = rForm.querySelector('select');

        var currentAssignment = document.querySelector('.assignment-name');        
        var aForm = document.querySelector('#assignment-edit');
        var aSelect = aForm.querySelector('select');

        var mForm = document.querySelector('#mod-edit');
        var mSelect = mForm.querySelector('select');

        function currentMods() {
            var items = document.querySelectorAll('.shift-entry__mod-list-item');
            var mods = [];

            items.forEach(function(i) {
                mods.push(i.dataset.modId);
            });

            return mods;
        }

        function disableCurrentMods() {
            var currMods = currentMods();
            var options = mSelect.querySelectorAll('option');
            var firstSet = false;

            options.forEach(function(o) {
                o.removeAttribute('disabled');

                for (let i = 0; i < currMods.length; i++) {
                    const mod = currMods[i];
                    
                    if (o.value === mod) {
                        o.setAttribute('disabled', 'disabled');
                        break;                        
                    }
                }

                if (!firstSet && !o.disabled) {
                    mSelect.value = o.value;
                    firstSet = true;
                }
            });
        }

        function disableCurrent(current, select) {
            var options = select.querySelectorAll('option');
            var firstSet = false;

            options.forEach(function(o) {
                if (o.textContent === current) {
                    o.setAttribute('disabled', 'disabled');
                } else {
                    o.removeAttribute('disabled');
                }

                if (!firstSet && !o.disabled) {
                    select.value = o.value;
                    firstSet = true;
                }
            });
        }

        showEdits.forEach(function(e) {
            e.addEventListener('click', function (ev) {
                var target = document.querySelector('div[data-show-target="' + e.dataset.show + '"]');

                target.classList.toggle('hidden');
            });
        });

        hideEdits.forEach(function (e) {
            e.addEventListener('click', function (ev) {
                ev.preventDefault();

                var target = document.querySelector('div[data-show-target="' + e.dataset.hide + '"]');

                target.classList.add('hidden');
            });
        });

        rForm.addEventListener('submit', function (e) {
            e.preventDefault();
        });

        disableCurrent(currentRole.textContent, rSelect);

        aForm.addEventListener('submit', function (e) {
            e.preventDefault();
        });

        disableCurrent(currentAssignment.textContent, aSelect);

        mForm.addEventListener('submit', function (e) {
            e.preventDefault();
        });

        disableCurrentMods();
    }

    Modal.showModal({
        callbackOnShow: setupShiftModal,
        innerHTML: ShiftTracker.templates.modal({
            id:19,
            title: 'Tim Austin'+'\'s shift:',
            name: 'Tim Austin',
            date: '2018-03-02',
            d_or_n: 'D',
            role_name: 'Clinician',
            roles: [
                {id: 1, name: 'Bedside'},
                {id: 2, name: 'Float'},
                {id: 3, name: 'Clinician'}
            ],
            assignment_name: 'A/B',
            assignments: [
                { id: 1, name: 'A/B' },
                { id: 2, name: 'B/C' },
                { id: 3, name: 'A/B/C' }
            ],
            shift_mods: [
                { shift_mod_id: 2, mod_id: 1, mod_name: 'crrt' },
                { shift_mod_id: 3, mod_id: 2, mod_name: 'evd' },
                { shift_mod_id: 4, mod_id: 3, mod_name: 'burn' }
            ],
            mods: [
                { id: 1, name: 'crrt' },
                { id: 2, name: 'evd' },
                { id: 3, name: 'burn' },
                { id: 4, name: 'admit' },
                { id: 5, name: 'codes' }                
            ],
            whichContent: 'shift_entry_modal_content',
            whichFooter: 'shift_entry_modal_footer'
        })
    });
}

$(function() {
    var shiftDisplayContainer = document.querySelector('.shift-container');
    var modalDisplayContainer = document.querySelector('.modal-container');

    shiftDisplayContainer.innerHTML = ShiftTracker.templates.loader({ date: '2018-01-02' });

    Shifts.getShifts({
        callback: function (data) {
            shiftDisplayContainer.innerHTML = ShiftTracker.templates.shift_table(data);
        }
    });

    showShiftModal();
});