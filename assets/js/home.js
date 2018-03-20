/*global axios*/
/*global moment*/
/*global Handlebars*/
/*global ShiftTracker*/
/*global Modal*/
/*global ShiftEntryModal*/

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



$(function() {
    var shiftDisplayContainer = document.querySelector('.shift-container');
    var modalDisplayContainer = document.querySelector('.modal-container');

    function getShiftsToPageTable() {
        Shifts.getShifts({
            callback: function (data) {
                shiftDisplayContainer.innerHTML = ShiftTracker.templates.shift_table(data);

                document.addEventListener('click', function (e) {
                    if (!e.target.classList.contains('st-link')) return;

                    var id = e.target.dataset.shiftId;

                    //if a shift link is clicked, call the ShiftEntryModal.show()
                    ShiftEntryModal.show({
                        shiftEntryId: id,
                        onupdate: getShiftsToPageTable,
                        ondelete: getShiftsToPageTable
                    });
                });
            }
        });

    }

    shiftDisplayContainer.innerHTML = ShiftTracker.templates.loader({ date: '2018-01-02' });

    getShiftsToPageTable();
});