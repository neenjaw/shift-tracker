/*global axios*/
/*global moment*/
/*global ShiftTracker*/

var Shifts = (function () {
    var shiftContainer = document.querySelector('.shift-container');
    var numDaysSpan = document.querySelector('.number-of-days');

    var numberOfDaysToRetrieve = 15;

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
            .subtract(numberOfDaysToRetrieve, 'days')
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

            })
            .catch(function (error) {
                console.log(error);

            });
    }

    return {
        setNumberOfDaysToRetrieve: setNumberOfDaysToRetrieve,
        getShifts: getShifts
    };
}());

$(function() {
    Shifts.getShifts();

    document.querySelector('.shift-container').innerHTML = ShiftTracker.templates.test({foo:true, bar:'The rain in spain falls mostly on the plain'});
});