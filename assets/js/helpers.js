/*global moment*/
/*global Handlebars*/

// add the printDate helper
Handlebars.registerHelper('printDate', function (dateString) {
    var momentDate = moment(dateString, 'YYYY-MM-DD');
    var month = momentDate.format('MMM');
    var day = momentDate.format('D');

    return new Handlebars.SafeString(month + '<br>' + day);
});

Handlebars.registerHelper('printInlineDate', function (dateString) {
    var momentDate = moment(dateString, 'YYYY-MM-DD');
    var str = momentDate.format('MMM-D');

    return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('printFullInlineDate', function () {
    var str = moment().format('YYYY-MM-DD');

    return new Handlebars.SafeString(str);
});

// add the stringToProperCase helper
Handlebars.registerHelper('stringToProperCase', function (str) {
    var splits = str.split(' ');

    for (let i = 0; i < splits.length; i++) {
        var s = splits[i];
        splits[i] = s.slice(0, 1).toUpperCase() + s.slice(1);
    }

    return new Handlebars.SafeString(splits.join(' '));
});

// add the printActive helper
Handlebars.registerHelper('printActive', function (ac) {
    var active = (ac) ? 'Active' : 'Inactive';

    return new Handlebars.SafeString(active);
});

// add the printPercent helper
Handlebars.registerHelper('printPercent', function (v1, v2) {
    var percent = Math.round(v1 / v2 * 100);

    return new Handlebars.SafeString(percent + '%');
});

// add the ifgtZero helper
Handlebars.registerHelper('ifgtZero', function (v1, options) {
    if (v1 > 0) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// add the iftrue helper
Handlebars.registerHelper('iftrue', function (v1, options) {
    if (v1 === true) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// add the iffalse helper
Handlebars.registerHelper('iffalse', function (v1, options) {
    if (v1 === false) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// add the ifMatch helper
Handlebars.registerHelper('ifMatch', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// add the checkIfChecked helper
Handlebars.registerHelper('checkIfChecked', function (id, mods) {
    if (mods === null) return '';

    for (let i = 0; i < mods.length; i++) {
        var mod = mods[i];

        if (mod.mod_id == id) {
            return new Handlebars.SafeString('data-shiftmod-id="' + mod.shiftmod_id + '" checked');
        }
    }

    return '';
});

// add the checkIfChecked helper
Handlebars.registerHelper('checkIfIdSelected', function (id, idList) {
    idList = idList || null;

    if (idList === null) return '';

    if (idList.includes(id)) {
        return 'selected';
    }

    return '';
});

// add the binaryToBoolean helper
Handlebars.registerHelper('binaryToBoolean', function (binary) {
    if (binary == 1) return 'true';

    return 'false';
});

// add the checkIfChecked helper
Handlebars.registerHelper('checkIfSelected', function (id, assignmentId) {
    if (assignmentId == id) {
        return 'selected';
    }

    return '';
});

//add debug helper
Handlebars.registerHelper('debug', function (optionalValue) {
    console.log('👏Current Context');
    console.log('====================');
    console.log(this);

    // if (optionalValue) {
    //     console.log('Value');
    //     console.log('====================');
    //     console.log(optionalValue);
    // }
});

// add the checkIfChecked helper
Handlebars.registerHelper('chooseMaxUpTo', function (v1, v2, v3) {
    var max = (v1 > v2) ? v1 : v2;

    if (max > v3) {
        return v3;
    }

    return max;
});

// add the printAssignmentReportRow helper
Handlebars.registerHelper('printAssignmentReportRow', function (staff, assignmentDictionary, modDictionary) {
    console.log({staff, assignmentDictionary, modDictionary});
    

    var aPod = 0, bPod = 0, cPod = 0, lastPod = 'N/A', lastRole = 'N/A', doubleCount = 0;

    if (staff.assignments && staff.assignments[assignmentDictionary.A]) aPod = staff.assignments[assignmentDictionary.A].count;
    if (staff.assignments && staff.assignments[assignmentDictionary.B]) bPod = staff.assignments[assignmentDictionary.B].count;
    if (staff.assignments && staff.assignments[assignmentDictionary.C]) cPod = staff.assignments[assignmentDictionary.C].count;

    if (staff.shifts && staff.shifts.length > 1) {
        lastPod = staff.shifts[0].assignment_name;
        lastRole = staff.shifts[0].role_name;
    }

    if (staff.mods && staff.mods[modDictionary.double]) doubleCount = staff.mods[modDictionary.double].count;

    return new Handlebars.SafeString(
        '<td>'+staff.last_name+', '+staff.first_name+'</td>' +
        '<td>'+aPod+'</td>' +
        '<td>'+bPod+'</td>' +
        '<td>'+cPod+'</td>' +
        '<td>'+lastRole+'</td>' +
        '<td>'+lastPod+'</td>' +
        '<td>'+doubleCount+'</td>'
    );
});