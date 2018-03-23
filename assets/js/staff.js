/*global axios*/
/*global moment*/
/*global Handlebars*/
/*global ShiftTracker*/
/*global getURLParameter*/

var StaffPage = (function() {    
    function showIndex(container) {
        axios
            .get('/api/staff_member/read.php')
            .then(function (response) {
                console.log(response);
                
                var data = response.data;

                if (data.response === 'OK') {
                    var groups = {
                        RN: {name: 'RN', staff: []},
                        LPN: {name: 'LPN', staff: []},
                        NA: {name: 'NA', staff: []},
                        UC: {name: 'UC', staff: []}
                    };

                    data.records.forEach(function(element) {
                        groups[element.category_name].staff.push(element);
                    });
                    console.log(groups);
                    

                    container.innerHTML = ShiftTracker.templates.staff.index({ groups: groups });
                } else {
                    container.innerHTML = ShiftTracker.templates.staff.error();
                }
            })
            .catch(function (error) {
                console.error(error);
                container.innerHTML = ShiftTracker.templates.staff.error();
            });
    }

    function showStaff(container, id) {
        axios
            .get('/api/shift/read_one_staff.php', { 
                params: {
                    staff_id: id
                }
            })
            .then(function (response) {
                console.log(response);

                var data = response.data;

                if (data.response === 'OK' && data.count === 1) {
                    //container.innerHTML = ShiftTracker.templates.staff.display({});
                }
                
            })
            .catch(function (error) {
                console.error(error);
                container.innerHTML = ShiftTracker.templates.staff.error();
            });
    }

    return {
        showIndex: showIndex,
        showStaff: showStaff
    };
}());

$(function() {
    var container = document.querySelector('.container.content');
    var id = getURLParameter('staff_id');

    container.innerHTML = ShiftTracker.templates.loader({ date: '2018-01-02' });    

    if (id) {
        StaffPage.showStaff(container, id);
    } else {
        StaffPage.showIndex(container);
    }
});