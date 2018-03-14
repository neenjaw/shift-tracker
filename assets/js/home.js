/*global axios*/
/*global moment*/
/*global ShiftTracker*/

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

    function getShifts() {
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

                tableData = formatTableData(response.data);
                //TODO: fix handlebars template, call it here
            })
            .catch(function (error) {
                console.log(error);

            });
    }

    function formatTableData(data) {
        function makeStaffEntry(staff) {
            return {
                firstName: firstName,
                lastName:  lastName,
                id:        id,
                shifts:    []
            };
        }

        function makeShiftCell(shift) {
            var cell = {
                id:    shift.id,
                class: null,
                char:  null,
                charHover: null,
                date:  shift.shift_date,
                staffName: (shift.staff_first_name +' '+ shift.staff_last_name +', '+ shift.staff_category_name)
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
                    mod = mods[index];

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

        function makeBlankShiftCell(date, staffFirstName, staffLastName) {
            return {
                id: null,
                class: null,
                char: '-',
                date: date,
                staffName: (staffFirstName + ' ' + staffLastName)
            };
        }

        var startDate = data.date_from;
        var endDate = data.date_to;

        var records = data.records;

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

        for (var index = 0; index < records.length; index++) {
            var shift = records[index];
            group[shift.staff_category_name].push(makeShiftCell(shift));
        }

        //TODO: Now fill in all the dates for each staff member with blanks when they have no shift

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
    Shifts.getShifts();

    // document.querySelector('.shift-container').innerHTML = ShiftTracker.templates.test({foo:true, bar:'The rain in spain falls mostly on the plain'});
});