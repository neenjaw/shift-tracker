this["ShiftTracker"] = this["ShiftTracker"] || {};
this["ShiftTracker"]["templates"] = this["ShiftTracker"]["templates"] || {};
this["ShiftTracker"]["templates"]["loader"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"main-loader mb-2\">\n    <span class=\"main-spinner\"><i class=\"fas fa-spinner fa-pulse\"></i></span>\n</div>";
},"useData":true});
Handlebars.registerPartial("test", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "seeya later";
},"useData":true}));
this["ShiftTracker"]["templates"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"modal__body\">\n    <div class=\"modal__head\">\n        <h2>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n    </div>\n    <div class=\"modal__content\">\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(alias1,depth0,"whichContent",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"modal__footer\">\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(alias1,depth0,"whichFooter",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        <button class=\"modal-close btn btn-primary\">Close</button>\n    </div>\n</div>";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_assignment", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"assignment-list\">\n        <label for=\"assignment-list-select\">Select Assignment</label>\n        <select class=\"shift__assignment form-control\" id=\"assignment-list-select\" size=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.assignments : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.assignments : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "selected";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <p>Must be an error, there should be an assignment to pick from.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"assignment\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.assignments : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["partial"] = this["ShiftTracker"]["templates"]["partial"] || {};
this["ShiftTracker"]["templates"]["partial"]["holder"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"whichPartial",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":" ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_controls", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button class=\"shift-previous-step btn btn-primary\">Previous</a>\n<button class=\"shift-next-step btn btn-primary ml-2\">Next</a>\n<button class=\"shift-submit btn btn-primary ml-2\">Submit</a>";
},"useData":true}));
this["ShiftTracker"]["templates"]["shift"] = this["ShiftTracker"]["templates"]["shift"] || {};
this["ShiftTracker"]["templates"]["shift"]["add"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"add-wrap\">\n    <div class=\"content\">\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"whichContentPartial",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"controls\">\n"
    + ((stack1 = container.invokePartial(partials.add_shift_controls,depth0,{"name":"add_shift_controls","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_date", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.dayOrNight : depth0),"D",{"name":"ifMatch","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.dayOrNight : depth0),"N",{"name":"ifMatch","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"date\">\n    <label for=\"date\">Enter the shift date:</label>\n    <input type=\"date\" id=\"date\" class=\"shift__date\" min=\"2000-01-01\" max=\""
    + alias4(((helper = (helper = helpers.today || (depth0 != null ? depth0.today : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"today","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.today || (depth0 != null ? depth0.today : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"today","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"YYYY-MM-DD\">\n</div>\n<div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">\n    <label class=\"btn btn-secondary "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.dayOrNight : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(2, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n        <input class=\"shift__day-or-night\" type=\"radio\" value=\"D\" autocomplete=\"off\"> Day\n    </label>\n    <label class=\"btn btn-secondary "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.dayOrNight : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n        <input class=\"shift__day-or-night\" type=\"radio\" value=\"N\" autocomplete=\"off\"> Night\n    </label>\n</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["shift"]["error"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "        <p class=\"text-muted\">"
    + ((stack1 = ((helper = (helper = helpers.errorMsg || (depth0 != null ? depth0.errorMsg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"errorMsg","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <p class=\"text-muted\">There was an error displaying this shift page.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"add-wrap\">\n    <div class=\"content\">\n        <h2>Page Error</h2>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.errorMsg : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"controls\">\n"
    + ((stack1 = container.invokePartial(partials.add_shift_controls,depth0,{"name":"add_shift_controls","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_mod", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mods : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"mod-list\">\n            <label for=\"mod-list-select\">Select Shift Modifiers</label>\n\n            <div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mods : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <div class=\"shift__mod\">\n                    <input class=\"mod-input\" type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n                    <label for=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\"><span></span>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</label>\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <p>Must be an error, there should be a modifier to pick from.</p>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <p>You made it, submit the shift!</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mod\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.hasMods : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["shift"]["table"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <div class=\"st-rowhead-cell st-divider-cell\">\n          <span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\n      </div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \n    ";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"st-rowhead-cell\">\n            <span><a href=\"/staff?staff_id="
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-staff-id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.nameReverse : depth0), depth0))
    + "</a></span>\n        </div>\n      ";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"st-cell st-header-cell\">\n          <span>"
    + container.escapeExpression((helpers.printDate || (depth0 && depth0.printDate) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"printDate","hash":{},"data":data}))
    + "</span>\n        </div>\n      ";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n      <div class=\"st-row\">\n"
    + ((stack1 = helpers.each.call(alias1,(depths[1] != null ? depths[1].dates : depths[1]),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \n      </div>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \n    ";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"st-cell st-divider-cell\">\n          <span>&nbsp;</span>\n        </div>\n        ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n        <div class=\"st-row\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shifts : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \n        </div>\n\n      ";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <div class=\"st-cell\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.charHover : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n              <span data-shift-date=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.date : depth0), depth0))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "")
    + "              </span>\n            </div>\n          ";
},"11":function(container,depth0,helpers,partials,data) {
    return " data-char-hover=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.charHover : depth0), depth0))
    + "\"";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                  <a class=\"st-link"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["class"] : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " href=\"javascript:void(0);\" data-shift-id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0["char"] : depth0), depth0))
    + "</a>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0["class"] : depth0), depth0))
    + "\"";
},"16":function(container,depth0,helpers,partials,data) {
    return "                  "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0["char"] : depth0), depth0))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"st-container\">\n  <div class=\"st-left-col\">\n    <div class=\"st-rowhead-cell st-header-cell\">\n      <span>Date</span>\n    </div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.groups : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \n  </div>\n\n  <div class=\"st-right-col\">\n    <div class=\"st-row\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dates : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \n    </div>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.groups : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \n  </div>\n</div>\n";
},"useData":true,"useDepths":true});
Handlebars.registerPartial("add_shift_role", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"role-list\">\n            <label for=\"role-list-select\">Select Role</label>\n            <select class=\"shift__role form-control\" id=\"role-list-select\" size=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.roles : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "selected";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <p>Must be an error, there should be a role to pick from.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"role\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.roles : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["staff"] = this["ShiftTracker"]["templates"]["staff"] || {};
this["ShiftTracker"]["templates"]["staff"]["add"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.name : depth0),"RN",{"name":"ifMatch","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<form class=\"add-staff\">\n    <div class=\"name\">\n        <div class=\"form-group first\">\n            <label for=\"first-name\">First Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"first-name\" placeholder=\"First\" required>\n        </div>\n        <div class=\"form-group last\">\n            <label for=\"last-name\">Last Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"last-name\" placeholder=\"Last\" required>\n        </div>\n    </div>\n    <div class=\"form-group category\">\n        <label for=\"category\">Category select</label>\n        <select class=\"form-control select-category\" id=\"category\" size=\"4\" required>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n    </div>\n    <div class=\"controls\">\n        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">Create new Staff Member</button>\n    </div>\n</form>\n\n";
},"useData":true});
Handlebars.registerPartial("add_shift_staff", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "        <div class=\"staff-search\">\n            <input class=\"staff-search-box form-control\" type=\"text\" placeholder=\"Future Search Feature\" readonly>\n        </div>\n        <div class=\"staff-list mt-2\">\n            <label for=\"staff-list-select\">Select Staff</label>\n            <select class=\"shift__staff form-control\" id=\"staff-list-select\" size=\"9\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-category=\""
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].staffId : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.firstName : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + ")</option>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),(depths[1] != null ? depths[1].staffId : depths[1]),{"name":"ifMatch","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "selected";
},"6":function(container,depth0,helpers,partials,data) {
    return "        <p>All staff have a shift this day already, or there are no staff.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"staff\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</div>\n\n";
},"useData":true,"useDepths":true}));
this["ShiftTracker"]["templates"]["staff"]["display"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rounded-outline staff__category staff__item\">\n    <span>\n        <span>Category:&nbsp;</span><span class=\"staff__category-name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.categoryName : stack1), depth0))
    + "</span>\n        <a class=\"staff__edit-toggle btn-secondary\" data-staff-edit=\"category\" href=\"javascript:void(0);\">\n            <i class=\"fas fa-pencil-alt\"></i>\n        </a>\n    </span>\n    <div class=\"hidden\" data-staff-edit-target=\"category\">\n        <form action=\"\" id=\"category\" class=\"staff__category-edit staff__item-edit\">\n            <select class=\"staff__select staff__category-select\" required>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n\n            <button class=\"staff__cancel-item-edit staff__btn btn-danger\" data-staff-edit=\"category\">\n                <i class=\"fas fa-times\"></i>\n            </button>\n            <button class=\"staff__submit-item-edit staff__btn btn-success\">\n                <i class=\"fas fa-check\"></i>\n            </button>\n        </form>\n    </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rounded-outline staff__active staff__item\">\n    <span>\n        Status:&nbsp;\n        <span class=\"staff__active-name\">"
    + container.escapeExpression((helpers.printActive || (depth0 && depth0.printActive) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.active : stack1),{"name":"printActive","hash":{},"data":data}))
    + "</span>\n        <a class=\"staff__edit-toggle btn-secondary\" data-staff-edit=\"active\" href=\"javascript:void(0);\">\n            <i class=\"fas fa-pencil-alt\"></i>\n        </a>\n    </span>\n    <div class=\"hidden\" data-staff-edit-target=\"active\">\n        <form action=\"\" id=\"active\" class=\"staff__active-edit staff__item-edit\">\n            <select class=\"staff__select staff__active-select\" required>\n                <option value=\"1\">Active</option>\n                <option value=\"0\">Inactive</option>\n            </select>\n\n            <button class=\"staff__cancel-item-edit staff__btn btn-danger\" data-staff-edit=\"active\">\n                <i class=\"fas fa-times\"></i>\n            </button>\n            <button class=\"staff__submit-item-edit staff__btn btn-success\">\n                <i class=\"fas fa-check\"></i>\n            </button>\n        </form>\n    </div>\n</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rounded-outline\">\n    <table class=\"table table-sm staff__shifts\">\n        <thead class=\"thead-dark\">\n            <tr>\n                <th scope=\"col\">Date (<i class=\"fas fa-long-arrow-alt-down\"></i>)</th>\n                <th scope=\"col\">Assignment</th>\n                <th scope=\"col\">Role</th>\n                <th scope=\"col\" class=\"text-center\">Action</th>\n            </tr>\n        </thead>\n        <tbody>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shifts : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </tbody>\n    </table>\n</div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <tr>\n                <th scope=\"row\">"
    + alias4(((helper = (helper = helpers.shift_date || (depth0 != null ? depth0.shift_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shift_date","hash":{},"data":data}) : helper)))
    + "</th>\n                <td><span class=\"assignment\">"
    + alias4(((helper = (helper = helpers.assignment_name || (depth0 != null ? depth0.assignment_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"assignment_name","hash":{},"data":data}) : helper)))
    + "</span></td>\n                <td><span class=\"role\">"
    + alias4(((helper = (helper = helpers.role_name || (depth0 != null ? depth0.role_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"role_name","hash":{},"data":data}) : helper)))
    + "</span></td>\n                <td class=\"text-center\">\n                    <a href=\"javascript:void(0);\" data-shift-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                        <i class=\"far fa-edit\"></i>\n                    </a>\n                </td>\n            </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"title rounded-outline\">\n    <h2>Staff Detail</h2>\n    <h4 class=\"text-muted\">Name: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "</h4>\n    <input id=\"staff__id\" type=\"hidden\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">    \n</div>\n\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.categoryName : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.active : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"staff__shift-stats\">\n"
    + ((stack1 = container.invokePartial(partials.staff_detail_statistics,depth0,{"name":"staff_detail_statistics","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.shifts : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_bedside", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"staff-search\">\n        <input class=\"staff-search-box form-control\" type=\"text\" placeholder=\"Future Search Feature\" readonly>\n    </div>\n    <div class=\"staff-list mt-2\">\n        <label for=\"bedside-list-select\">Select Shift Bedside Nurses</label>\n        <select class=\"shift__bedside form-control\" id=\"bedside-list-select\" size=\""
    + container.escapeExpression((helpers.chooseMaxUpTo || (depth0 && depth0.chooseMaxUpTo) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.staffForChargePick : depth0)) != null ? stack1.length : stack1),5,9,{"name":"chooseMaxUpTo","hash":{},"data":data}))
    + "\" multiple>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staffForBedsidePick : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + alias2((helpers.checkIfIdSelected || (depth0 && depth0.checkIfIdSelected) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),((stack1 = (data && data.root)) && stack1.bedsideIds),{"name":"checkIfIdSelected","hash":{},"data":data}))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.firstName : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + ")</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <p>All staff have a shift this day already, or there are no staff, use the single shift add form to add individual shifts.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"staff\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staffForBedsidePick : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n";
},"useData":true}));
Handlebars.registerPartial("add_shift_bedside_pods", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "    <div>\n        <p>Select Assignment for Bedside Nurses</p>\n    </div>\n    <div class=\"staff-list mt-2\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.staffPickedForBedside : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"bedside-staff-member\" data-staff-id=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.id : stack1), depth0))
    + "\">\n            <span>\n                "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.lastName : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.firstName : stack1), depth0))
    + " ("
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.categoryName : stack1), depth0))
    + ")\n            </span>\n            <div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.assignmentsForBedside),{"name":"each","hash":{},"fn":container.program(3, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "            </div>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <span class=\"pod-assignment\">\n                    <input class=\"pod\" type=\"radio\" name=\""
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? stack1.id : stack1), depth0))
    + "-assignment\" id=\""
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? stack1.id : stack1), depth0))
    + "-"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.name : stack1), depth0))
    + "\" value=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.id : stack1), depth0))
    + "\" required>\n                    <label for=\""
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? stack1.id : stack1), depth0))
    + "-"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.name : stack1), depth0))
    + "\"><span></span>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.name : stack1), depth0))
    + "</label>\n                </span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <p>All staff have a shift this day already, or there are no staff, use the single shift add form to add individual shifts.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div class=\"staff\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staffPickedForBedside : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.program(5, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</div>\n\n";
},"useData":true,"useBlockParams":true}));
this["ShiftTracker"]["templates"]["staff"]["error"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p class=\"text-muted\">"
    + ((stack1 = ((helper = (helper = helpers.errorMsg || (depth0 != null ? depth0.errorMsg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"errorMsg","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<p class=\"text-muted\">There was an error displaying this staff page.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2>Page Error</h2>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.errorMsg : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
this["ShiftTracker"]["templates"]["staff"]["index"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <tr>\n                <th scope=\"row\" colspan=\"3\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n            </tr>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <tr>\n                    <th scope=\"row\">&nbsp;</th>\n                    <td>"
    + alias4(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"last_name","hash":{},"data":data}) : helper)))
    + ", "
    + alias4(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"first_name","hash":{},"data":data}) : helper)))
    + "</td>\n                    <td class=\"text-center\"><a href=\"/staff?staff_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fas fa-info-circle\"></i></a></td>\n                </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"title rounded-outline\">\n    <h2>All Staff</h2>\n    <h4 class=\"text-muted\">Pick someone to view details.</h4>\n</div>\n\n<table class=\"table table-sm\">\n    <thead class=\"thead-dark\">\n        <tr>\n            <th scope=\"col\">Category</th>\n            <th scope=\"col\">Name</th>\n            <th scope=\"col\" class=\"text-center\">Profile</th>\n        </tr>\n    </thead>\n    <tbody>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.groups : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>";
},"useData":true});
Handlebars.registerPartial("add_shift_charge", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"staff-search\">\n            <input class=\"staff-search-box form-control\" type=\"text\" placeholder=\"Future Search Feature\" readonly>\n        </div>\n        <div class=\"staff-list mt-2\">\n            <label for=\"charge-list-select\">Select Shift Charge</label>\n            <select class=\"shift__charge form-control\" id=\"charge-list-select\" size=\""
    + container.escapeExpression((helpers.chooseMaxUpTo || (depth0 && depth0.chooseMaxUpTo) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.staffForChargePick : depth0)) != null ? stack1.length : stack1),5,9,{"name":"chooseMaxUpTo","hash":{},"data":data}))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staffForChargePick : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-category=\""
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.chargeId),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.firstName : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + ")</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.chargeId),(depth0 != null ? depth0.id : depth0),{"name":"ifMatch","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "selected";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "        <p>All staff have a shift this day already, or there are no staff, use the single shift add form to add individual shifts.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"staff\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staffForChargePick : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n";
},"useData":true}));
this["ShiftTracker"]["templates"]["staff"]["shiftform"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + alias2((helpers.checkIfSelected || (depth0 && depth0.checkIfSelected) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].shift : depths[1])) != null ? stack1.assignment_id : stack1),{"name":"checkIfSelected","hash":{},"data":data}))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + alias2((helpers.checkIfSelected || (depth0 && depth0.checkIfSelected) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].shift : depths[1])) != null ? stack1.role_id : stack1),{"name":"checkIfSelected","hash":{},"data":data}))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <div class=\"shift-edit__mod\">\n                            <input type=\"checkbox\" class=\"shift-edit__checkbox\" id=\"mod_"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + alias2((helpers.checkIfChecked || (depth0 && depth0.checkIfChecked) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].shift : depths[1])) != null ? stack1.shift_mods : stack1),{"name":"checkIfChecked","hash":{},"data":data}))
    + ">\n                            <label for=\"mod_"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">&nbsp;"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</label>\n                        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<tr class=\"shift-edit-row\" data-shift-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n    <td colspan=\"4\">\n        <div class=\"shift-edit-container hidden\">\n            <form class=\"shift-edit__form\" data-shift-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n                <div class=\"shift-edit__assignment-wrap\">\n                    <h6>Assignment:&nbsp;</h6>\n                    <select class=\"shift-edit__select shift-edit__assignment\" required>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.assignments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\n                </div>\n                <div class=\"shift-edit__role-wrap\">\n                    <h6>Role:&nbsp;</h6>\n                    <select class=\"shift-edit__select shift-edit__role\" required>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\n                </div>\n                <div class=\"shift-edit__mods-wrap\">\n                    <h6>Mods:&nbsp;</h6>\n                    <div class=\"shift-edit__mods\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mods : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"shift-edit__controls\">\n                    <span>\n                        <button class=\"delete-shift btn btn-sm btn-danger mr-4\">Delete</button>\n                    </span>\n                    <span>\n                        <button class=\"submit-edit btn btn-sm btn-primary\">Submit</button>\n                        <button class=\"cancel-edit btn btn-sm btn-secondary\">Cancel</button>\n                    </span>\n                </div>\n            </form>\n        </div>\n    </td>\n</tr>";
},"useData":true,"useDepths":true});
Handlebars.registerPartial("add_shift_charge_pod", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-assignment=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.clinicianAssignmentId),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n                    "
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\n                </option>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.clinicianAssignmentId),(depth0 != null ? depth0.id : depth0),{"name":"ifMatch","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "selected";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.name : depth0),"A/B",{"name":"ifMatch","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"form-group\">\n        <label for=\"charge-pod-select\">Select Change Assignment</label>\n        <select class=\"shift__charge-pod form-control\" id=\"charge-pod-select\" size=\"2\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.assignmentForChargePodPick : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n    </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-assignment=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.chargeAssignmentId),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n                    "
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\n                </option>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.chargeAssignmentId),(depth0 != null ? depth0.id : depth0),{"name":"ifMatch","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.name : depth0),"C",{"name":"ifMatch","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"staff\">\n    <div class=\"form-group\">\n        <label for=\"clinician-pod-select\">Select Clinican Assignment</label>\n        <select class=\"shift__clinician-pod form-control\" id=\"clinician-pod-select\" size=\"2\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.assignmentForClinicianPodPick : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n    </div>\n"
    + ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.dayOrNight : depth0),"D",{"name":"ifMatch","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n";
},"useData":true}));
this["ShiftTracker"]["templates"]["staff"]["shiftformerror"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr class=\"shift-edit-row\">\n    <td colspan=\"4\">\n        <div class=\"shift-edit-container hidden\">\n            <h2>Error</h2>\n            <p>There was an error displaying this shift's information.</p>\n        </div>\n    </td>\n</tr>";
},"useData":true});
Handlebars.registerPartial("add_shift_clinician", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"staff-search\">\n            <input class=\"staff-search-box form-control\" type=\"text\" placeholder=\"Future Search Feature\" readonly>\n        </div>\n        <div class=\"staff-list mt-2\">\n            <label for=\"clinician-list-select\">Select Shift Clinician</label>\n            <select class=\"shift__clinician form-control\" id=\"clinician-list-select\" size=\""
    + container.escapeExpression((helpers.chooseMaxUpTo || (depth0 && depth0.chooseMaxUpTo) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.staffForClinicianPick : depth0)) != null ? stack1.length : stack1),5,9,{"name":"chooseMaxUpTo","hash":{},"data":data}))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staffForClinicianPick : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-category=\""
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.clinicianId),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.firstName : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + ")</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifMatch || (depth0 && depth0.ifMatch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.clinicianId),(depth0 != null ? depth0.id : depth0),{"name":"ifMatch","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "selected";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "        <p>All staff have a shift this day already, or there are no staff.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"staff\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staffForClinicianPick : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n";
},"useData":true}));
this["ShiftTracker"]["templates"]["test"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"which",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_outreach", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"staff-search\">\n            <input class=\"staff-search-box form-control\" type=\"text\" placeholder=\"Future Search Feature\" readonly>\n        </div>\n        <div class=\"staff-list mt-2\">\n            <label for=\"outreach-list-select\">Select Shift Outreach</label>\n            <select class=\"shift__outreach form-control\" id=\"outreach-list-select\" size=\""
    + container.escapeExpression((helpers.chooseMaxUpTo || (depth0 && depth0.chooseMaxUpTo) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.staffForOutreachPick : depth0)) != null ? stack1.length : stack1),5,9,{"name":"chooseMaxUpTo","hash":{},"data":data}))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staffForOutreachPick : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-category=\""
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.firstName : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + ")</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "selected";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <p>All staff have a shift this day already, or there are no staff.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"staff\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staffForOutreachPick : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n";
},"useData":true}));
Handlebars.registerPartial("shift_entry_modal_content", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li class=\"shift-entry__mod-list-item\" data-shift-mod-id=\""
    + alias2(alias1((depth0 != null ? depth0.shiftmod_id : depth0), depth0))
    + "\" data-mod-id=\""
    + alias2(alias1((depth0 != null ? depth0.mod_id : depth0), depth0))
    + "\">\n                    "
    + alias2(alias1((depth0 != null ? depth0.mod_name : depth0), depth0))
    + " <i class=\"fas fa-times\"></i>\n                </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"shift-entry-modal__wrapper\">\n    <input id=\"shift-entry__shift-id\" type=\"hidden\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n    <input id=\"shift-entry__shift-updated\" type=\"hidden\" value=\"false\">\n    <h5>"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "-"
    + alias2(alias1((depth0 != null ? depth0.d_or_n : depth0), depth0))
    + "</h5>\n    <ul class=\"shift-entry__details-list\">\n        <li class=\"shift-entry__details-list-item\">\n            <span class=\"shift-entry__detail\">\n                <span class=\"role-title\">Role: </span>\n                <span class=\"role-name\">"
    + alias2((helpers.stringToProperCase || (depth0 && depth0.stringToProperCase) || helpers.helperMissing).call(alias3,(depth0 != null ? depth0.role_name : depth0),{"name":"stringToProperCase","hash":{},"data":data}))
    + "</span>\n                <a class=\"shift-entry__show-item-edit btn-secondary\" data-show=\"role\" href=\"javascript:void(0);\">\n                    <i class=\"fas fa-pencil-alt\"></i>\n                </a>\n            </span>\n            <div class=\"hidden\" data-show-target=\"role\">\n                <!-- Hidden input to edit role -->\n                <form id=\"role-edit\" class=\"shift-entry__form shift-item-edit\">\n                    <select class=\"shift-entry__select shift-entry__role-select\" required>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\n                    \n                    <button class=\"shift-entry__cancel-item-edit shift-entry__btn btn-danger\" data-hide=\"role\">\n                        <i class=\"fas fa-times\"></i>\n                    </button>\n                    <button class=\"shift-entry__submit-item-edit shift-entry__btn btn-success\">\n                        <i class=\"fas fa-check\"></i>\n                    </button>\n                </form>\n            </div>\n        </li>\n\n        <li class=\"shift-entry__details-list-item\">\n            <span class=\"shift-entry__detail\">\n                <span class=\"assignment-title\">Assignment: </span>\n                <span class=\"assignment-name\">"
    + alias2(alias1((depth0 != null ? depth0.assignment_name : depth0), depth0))
    + "</span>\n                <a class=\"shift-entry__show-item-edit btn-secondary\" data-show=\"assignment\" href=\"javascript:void(0);\">\n                    <i class=\"fas fa-pencil-alt\"></i>\n                </a>\n            </span>\n            <div class=\"hidden\" data-show-target=\"assignment\">\n                <!-- Hidden input to edit role -->\n                <form id=\"assignment-edit\" class=\"shift-entry__form shift-entry__item-edit\">\n                    <select class=\"shift-entry__select shift-entry__role-select\" required>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.assignments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\n\n                    <button class=\"shift-entry__cancel-item-edit shift-entry__btn btn-danger\" data-hide=\"assignment\">\n                        <i class=\"fas fa-times\"></i>\n                    </button>\n                    <button class=\"shift-entry__submit-item-edit shift-entry__btn btn-success\">\n                        <i class=\"fas fa-check\"></i>\n                    </button>\n                </form>\n            </div>\n        </li>\n\n        <li class=\"shift-entry__details-list-item shift-entry__mods\">\n            <ul class=\"shift-entry__mod-list\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.shift_mods : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n            <div>\n                <form id=\"mod-edit\" class=\"shift-entry__form shift-entry___mod-add\">\n                    <select class=\"shift-entry__select shift-entry__mods\" id=\"shift-add-mod\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mods : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\n                    <button type=\"submit\" class=\"shift-entry__btn btn-primary\">\n                        <i class=\"fas fa-plus\"></i>\n                    </button>\n                </form>\n            </div>\n        </li>\n    </ul>\n</div>\n";
},"useData":true}));
Handlebars.registerPartial("shift_entry_modal_footer", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button class='shift-entry__delete btn btn-danger'>Delete</button>";
},"useData":true}));
Handlebars.registerPartial("staff_detail_statistics", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.assignmentStats : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.categoryStats : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.roleStats : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.modStats : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"rounded-outline staff__role-stats\">\n        <h5>Day/Night Statistics</h5>\n        <div class=\"stat__item\" data-stat-count=\""
    + alias4(((helper = (helper = helpers.dayCount || (depth0 != null ? depth0.dayCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dayCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-total=\""
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-percent=\""
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.dayCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + "\">\n            <p>Number of Day Shifts: "
    + alias4(((helper = (helper = helpers.dayCount || (depth0 != null ? depth0.dayCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dayCount","hash":{},"data":data}) : helper)))
    + " / "
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + " ("
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.dayCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\n        </div>\n        <div class=\"stat__item\" data-stat-count=\""
    + alias4(((helper = (helper = helpers.nightCount || (depth0 != null ? depth0.nightCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nightCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-total=\""
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-percent=\""
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.nightCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + "\">\n            <p>Number of Day Shifts: "
    + alias4(((helper = (helper = helpers.nightCount || (depth0 != null ? depth0.nightCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nightCount","hash":{},"data":data}) : helper)))
    + " / "
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + " ("
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.nightCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__assignment-stats\">\n        <h5>Assignment Statistics</h5>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.assignmentStats : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <div class=\"stat__item\" data-stat-count=\""
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\" data-stat-total=\""
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + "\" data-stat-percent=\""
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + "\">\n            <p>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + ": "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + " / "
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + " ("
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\n        </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__category-stats\">\n        <h5>Category Statistics</h5>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.categoryStats : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <div class=\"stat__item\" data-stat-count=\""
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\" data-stat-total=\""
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + "\" data-stat-percent=\""
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + "\" data-hi=\"a\">\n            <p>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + ": "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + " / "
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + " ("
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\n        </div>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__role-stats\">\n        <h5>Role Statistics</h5>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.roleStats : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <div class=\"stat__item\" data-stat-count=\""
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\" data-stat-total=\""
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + "\" data-stat-percent=\""
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + "\">\n            <p>"
    + alias2((helpers.stringToProperCase || (depth0 && depth0.stringToProperCase) || alias4).call(alias3,(depth0 != null ? depth0.name : depth0),{"name":"stringToProperCase","hash":{},"data":data}))
    + ": "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + " / "
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + " ("
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\n        </div>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__role-stats\">\n        <h5>Shift Statistics</h5>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.modStats : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"rounded-outline\">No statistics to display.  No shifts entered for this user.</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.ifgtZero || (depth0 && depth0.ifgtZero) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shiftCount : depth0),{"name":"ifgtZero","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true}));