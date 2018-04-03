/* global axios */
/* global Flash */
/* global ShiftTracker */
/* global User */

var AddStaff = function(options) {
    var settings = options || {};

    // add container listeners for submit
    document.addEventListener('submit', function(ev) {
        ev.preventDefault();
        // console.log(ev);
        
        submit(ev.target);
    });

    // show the form
    function show () {
        axios
            .get('/api/category/read.php')
            .then(function(response) {
                var data = response.data;

                if (data.response === 'ERROR') {
                    throw data.message;
                }

                if (data.response === 'OK') {

                    settings.container.innerHTML = settings.templates.show({categories: data.records});
                    document.getElementById('first-name').focus();
                }
            })
            .catch(function (error) {
                console.error(error);
                settings.container.innerHTML = settings.tempates.error({errorMsg: 'Unable to add a new staff member, try again later.'});
            });
    }

    function submit(form) {
        var first = document.getElementById('first-name').value;
        var last = document.getElementById('last-name').value;
        var cid = document.getElementById('category').value;


        axios
            .post('/api/staff_member/create.php', {
                first_name: first,
                last_name: last,
                category_id: cid,
                created_by: User.name
            })
            .then(function (response) {
                var data = response.data;

                if (data.response === 'ERROR') {
                    if (data.message.match(/^.*SQLSTATE\[23000\].*1062 Duplicate entry.*'uq_name'$/)) {
                        Flash.insertFlash('danger', first+' '+last+' is already a staff member.');
                    }
                }

                if (data.response === 'OK') {
                    if (data.created) {
                        Flash.insertFlash('success', data.message);
                        form.reset();
                        document.getElementById('first-name').focus();
                    }
                }
                
            })
            .catch(function (error) {
                console.error(error);
                settings.container.innerHTML = settings.tempates.error({ errorMsg: 'Unable to add a new staff member, try again later.' });
            });
    }

    return {
        show: show
    };
};

$(function() {
    var options = {
        container : document.querySelector('.add-container'),
        templates : {
            show: ShiftTracker.templates.staff.add,
            error: ShiftTracker.templates.staff.error
        }
    };
    
    var addStaffPage = AddStaff(options).show(); 
});