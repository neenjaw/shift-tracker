Handlebars.registerPartial("test", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "seeya later";
},"useData":true}));
this["ShiftTracker"] = this["ShiftTracker"] || {};
this["ShiftTracker"]["templates"] = this["ShiftTracker"]["templates"] || {};
this["ShiftTracker"]["templates"]["loader"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"main-loader mb-2\">\r\n    <span class=\"main-spinner\"><i class=\"fas fa-spinner fa-pulse\"></i></span>\r\n</div>";
},"useData":true});
Handlebars.registerPartial("add_shift_assignment", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"assignment-list\">\r\n        <label for=\"assignment-list-select\">Select Assignment</label>\r\n        <select class=\"shift__assignment form-control\" id=\"assignment-list-select\" size=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.assignments : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.assignments : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "selected";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <p>Must be an error, there should be an assignment to pick from.</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"assignment\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.assignments : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"modal__body\">\r\n    <div class=\"modal__head\">\r\n        <h2>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n    </div>\r\n    <div class=\"modal__content\">\r\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(alias1,depth0,"whichContent",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"modal__footer\">\r\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(alias1,depth0,"whichFooter",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        <button class=\"modal-close btn btn-primary\">Close</button>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_controls", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button class=\"shift-previous-step btn btn-primary\">Previous</a>\r\n<button class=\"shift-next-step btn btn-primary ml-2\">Next</a>\r\n<button class=\"shift-submit btn btn-primary ml-2\">Submit</a>";
},"useData":true}));
this["ShiftTracker"]["templates"]["partial"] = this["ShiftTracker"]["templates"]["partial"] || {};
this["ShiftTracker"]["templates"]["partial"]["holder"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"whichPartial",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":" ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_date", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"date\">\r\n    <label for=\"date\">Enter the shift date:</label>\r\n    <input type=\"date\" id=\"date\" class=\"shift__date\" min=\"2000-01-01\" max=\""
    + alias4(((helper = (helper = helpers.today || (depth0 != null ? depth0.today : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"today","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.today || (depth0 != null ? depth0.today : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"today","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"YYYY-MM-DD\">\r\n</div>\r\n<div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">\r\n    <label class=\"btn btn-secondary active\">\r\n        <input class=\"shift__day-or-night\" type=\"radio\" value=\"D\" autocomplete=\"off\" checked> Day\r\n    </label>\r\n    <label class=\"btn btn-secondary\">\r\n        <input class=\"shift__day-or-night\" type=\"radio\" value=\"N\" autocomplete=\"off\"> Night\r\n    </label>\r\n</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["shift"] = this["ShiftTracker"]["templates"]["shift"] || {};
this["ShiftTracker"]["templates"]["shift"]["add"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"add-wrap\">\r\n    <div class=\"content\">\r\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"whichContentPartial",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"controls\">\r\n"
    + ((stack1 = container.invokePartial(partials.add_shift_controls,depth0,{"name":"add_shift_controls","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\r\n</div>";
},"usePartial":true,"useData":true});
this["ShiftTracker"]["templates"]["shift"]["table"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <div class=\"st-rowhead-cell st-divider-cell\">\r\n          <span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\r\n      </div>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n    ";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"st-rowhead-cell\">\r\n            <span><a href=\"/staff?staff_id="
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-staff-id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.nameReverse : depth0), depth0))
    + "</a></span>\r\n        </div>\r\n      ";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"st-cell st-header-cell\">\r\n          <span>"
    + container.escapeExpression((helpers.printDate || (depth0 && depth0.printDate) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"printDate","hash":{},"data":data}))
    + "</span>\r\n        </div>\r\n      ";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\r\n      <div class=\"st-row\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depths[1] != null ? depths[1].dates : depths[1]),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n      </div>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n    ";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"st-cell st-divider-cell\">\r\n          <span>&nbsp;</span>\r\n        </div>\r\n        ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n        <div class=\"st-row\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shifts : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n        </div>\r\n\r\n      ";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <div class=\"st-cell\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.charHover : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n              <span data-shift-date=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.date : depth0), depth0))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "")
    + "              </span>\r\n            </div>\r\n          ";
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
    + "</a>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0["class"] : depth0), depth0))
    + "\"";
},"16":function(container,depth0,helpers,partials,data) {
    return "                  "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0["char"] : depth0), depth0))
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"st-container\">\r\n  <div class=\"st-left-col\">\r\n    <div class=\"st-rowhead-cell st-header-cell\">\r\n      <span>Date</span>\r\n    </div>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.groups : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n  </div>\r\n\r\n  <div class=\"st-right-col\">\r\n    <div class=\"st-row\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dates : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n    </div>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.groups : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n  </div>\r\n</div>\r\n";
},"useData":true,"useDepths":true});
this["ShiftTracker"]["templates"]["staff"] = this["ShiftTracker"]["templates"]["staff"] || {};
this["ShiftTracker"]["templates"]["staff"]["display"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rounded-outline staff__category staff__item\">\r\n    <span>\r\n        <span>Category:&nbsp;</span><span class=\"staff__category-name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.categoryName : stack1), depth0))
    + "</span>\r\n        <a class=\"staff__edit-toggle btn-secondary\" data-staff-edit=\"category\" href=\"javascript:void(0);\">\r\n            <i class=\"fas fa-pencil-alt\"></i>\r\n        </a>\r\n    </span>\r\n    <div class=\"hidden\" data-staff-edit-target=\"category\">\r\n        <form action=\"\" id=\"category\" class=\"staff__category-edit staff__item-edit\">\r\n            <select class=\"staff__select staff__category-select\" required>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\r\n\r\n            <button class=\"staff__cancel-item-edit staff__btn btn-danger\" data-staff-edit=\"category\">\r\n                <i class=\"fas fa-times\"></i>\r\n            </button>\r\n            <button class=\"staff__submit-item-edit staff__btn btn-success\">\r\n                <i class=\"fas fa-check\"></i>\r\n            </button>\r\n        </form>\r\n    </div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rounded-outline staff__active staff__item\">\r\n    <span>\r\n        Status:&nbsp;\r\n        <span class=\"staff__active-name\">"
    + container.escapeExpression((helpers.printActive || (depth0 && depth0.printActive) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.active : stack1),{"name":"printActive","hash":{},"data":data}))
    + "</span>\r\n        <a class=\"staff__edit-toggle btn-secondary\" data-staff-edit=\"active\" href=\"javascript:void(0);\">\r\n            <i class=\"fas fa-pencil-alt\"></i>\r\n        </a>\r\n    </span>\r\n    <div class=\"hidden\" data-staff-edit-target=\"active\">\r\n        <form action=\"\" id=\"active\" class=\"staff__active-edit staff__item-edit\">\r\n            <select class=\"staff__select staff__active-select\" required>\r\n                <option value=\"1\">Active</option>\r\n                <option value=\"0\">Inactive</option>\r\n            </select>\r\n\r\n            <button class=\"staff__cancel-item-edit staff__btn btn-danger\" data-staff-edit=\"active\">\r\n                <i class=\"fas fa-times\"></i>\r\n            </button>\r\n            <button class=\"staff__submit-item-edit staff__btn btn-success\">\r\n                <i class=\"fas fa-check\"></i>\r\n            </button>\r\n        </form>\r\n    </div>\r\n</div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rounded-outline\">\r\n    <table class=\"table table-sm staff__shifts\">\r\n        <thead class=\"thead-dark\">\r\n            <tr>\r\n                <th scope=\"col\">Date (<i class=\"fas fa-long-arrow-alt-down\"></i>)</th>\r\n                <th scope=\"col\">Assignment</th>\r\n                <th scope=\"col\">Role</th>\r\n                <th scope=\"col\" class=\"text-center\">Action</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shifts : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </tbody>\r\n    </table>\r\n</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <tr>\r\n                <th scope=\"row\">"
    + alias4(((helper = (helper = helpers.shift_date || (depth0 != null ? depth0.shift_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shift_date","hash":{},"data":data}) : helper)))
    + "</th>\r\n                <td><span class=\"assignment\">"
    + alias4(((helper = (helper = helpers.assignment_name || (depth0 != null ? depth0.assignment_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"assignment_name","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n                <td><span class=\"role\">"
    + alias4(((helper = (helper = helpers.role_name || (depth0 != null ? depth0.role_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"role_name","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n                <td class=\"text-center\">\r\n                    <a href=\"javascript:void(0);\" data-shift-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n                        <i class=\"far fa-edit\"></i>\r\n                    </a>\r\n                </td>\r\n            </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"title rounded-outline\">\r\n    <h2>Staff Detail</h2>\r\n    <h4 class=\"text-muted\">Name: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "</h4>\r\n    <input id=\"staff__id\" type=\"hidden\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">    \r\n</div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.categoryName : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.active : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n<div class=\"staff__shift-stats\">\r\n"
    + ((stack1 = container.invokePartial(partials.staff_detail_statistics,depth0,{"name":"staff_detail_statistics","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.shifts : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("add_shift_mod", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.mods : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"mod-list\">\r\n            <label for=\"mod-list-select\">Select Shift Modifiers</label>\r\n\r\n            <div>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mods : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <div class=\"shift__mod\">\r\n                    <input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\r\n                    <label for=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\"><span></span>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</label>\r\n                </div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <p>Must be an error, there should be a modifier to pick from.</p>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <p>You made it, submit the shift!</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mod\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.hasMods : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["staff"]["error"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p class=\"text-muted\">"
    + ((stack1 = ((helper = (helper = helpers.errorMsg || (depth0 != null ? depth0.errorMsg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"errorMsg","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<p class=\"text-muted\">There was an error displaying this staff page.</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2>Page Error</h2>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.errorMsg : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
Handlebars.registerPartial("add_shift_role", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"role-list\">\r\n            <label for=\"role-list-select\">Select Role</label>\r\n            <select class=\"shift__role form-control\" id=\"role-list-select\" size=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.roles : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\r\n        </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "selected";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <p>Must be an error, there should be a role to pick from.</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"role\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.roles : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["staff"]["index"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <tr>\r\n                <th scope=\"row\" colspan=\"3\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n            </tr>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <tr>\r\n                    <th scope=\"row\">&nbsp;</th>\r\n                    <td>"
    + alias4(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"last_name","hash":{},"data":data}) : helper)))
    + ", "
    + alias4(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"first_name","hash":{},"data":data}) : helper)))
    + "</td>\r\n                    <td class=\"text-center\"><a href=\"/staff?staff_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fas fa-info-circle\"></i></a></td>\r\n                </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"title rounded-outline\">\r\n    <h2>All Staff</h2>\r\n    <h4 class=\"text-muted\">Pick someone to view details.</h4>\r\n</div>\r\n\r\n<table class=\"table table-sm\">\r\n    <thead class=\"thead-dark\">\r\n        <tr>\r\n            <th scope=\"col\">Category</th>\r\n            <th scope=\"col\">Name</th>\r\n            <th scope=\"col\" class=\"text-center\">Profile</th>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.groups : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\r\n</table>";
},"useData":true});
Handlebars.registerPartial("add_shift_staff", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"staff-search\">\r\n            <input class=\"staff-search-box form-control\" type=\"text\" placeholder=\"Future Search Feature\" readonly>\r\n        </div>\r\n        <div class=\"staff-list mt-2\">\r\n            <label for=\"staff-list-select\">Select Staff</label>\r\n            <select class=\"shift__staff form-control\" id=\"staff-list-select\" size=\"9\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.staff : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\r\n        </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-category=\""
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.lastName : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.firstName : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.categoryName : depth0), depth0))
    + ")</option>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <p>All staff have a shift this day already, or there are no staff.</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"staff\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.staff : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true}));
this["ShiftTracker"]["templates"]["staff"]["shiftForm"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + alias2((helpers.checkIfSelected || (depth0 && depth0.checkIfSelected) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].shift : depths[1])) != null ? stack1.assignment_id : stack1),{"name":"checkIfSelected","hash":{},"data":data}))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\r\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + alias2((helpers.checkIfSelected || (depth0 && depth0.checkIfSelected) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].shift : depths[1])) != null ? stack1.role_id : stack1),{"name":"checkIfSelected","hash":{},"data":data}))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <div class=\"shift-edit__mod\">\r\n                            <input type=\"checkbox\" class=\"shift-edit__checkbox\" id=\"mod_"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" "
    + alias2((helpers.checkIfChecked || (depth0 && depth0.checkIfChecked) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].shift : depths[1])) != null ? stack1.shift_mods : stack1),{"name":"checkIfChecked","hash":{},"data":data}))
    + ">\r\n                            <label for=\"mod_"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">&nbsp;"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</label>\r\n                        </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "\r\n<tr class=\"shift-edit-row\" data-shift-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\r\n    <td colspan=\"4\">\r\n        <div class=\"shift-edit-container hidden\">\r\n            <form class=\"shift-edit__form\" data-shift-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\r\n                <div class=\"shift-edit__assignment-wrap\">\r\n                    <h6>Assignment:&nbsp;</h6>\r\n                    <select class=\"shift-edit__select shift-edit__assignment\" required>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.assignments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\r\n                </div>\r\n                <div class=\"shift-edit__role-wrap\">\r\n                    <h6>Role:&nbsp;</h6>\r\n                    <select class=\"shift-edit__select shift-edit__role\" required>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\r\n                </div>\r\n                <div class=\"shift-edit__mods-wrap\">\r\n                    <h6>Mods:&nbsp;</h6>\r\n                    <div class=\"shift-edit__mods\">\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mods : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\r\n                </div>\r\n                <div class=\"shift-edit__controls\">\r\n                    <span>\r\n                        <button class=\"delete-shift btn btn-sm btn-danger mr-4\">Delete</button>\r\n                    </span>\r\n                    <span>\r\n                        <button class=\"submit-edit btn btn-sm btn-primary\">Submit</button>\r\n                        <button class=\"cancel-edit btn btn-sm btn-secondary\">Cancel</button>\r\n                    </span>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </td>\r\n</tr>";
},"useData":true,"useDepths":true});
Handlebars.registerPartial("shift_entry_modal_content", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li class=\"shift-entry__mod-list-item\" data-shift-mod-id=\""
    + alias2(alias1((depth0 != null ? depth0.shiftmod_id : depth0), depth0))
    + "\" data-mod-id=\""
    + alias2(alias1((depth0 != null ? depth0.mod_id : depth0), depth0))
    + "\">\r\n                    "
    + alias2(alias1((depth0 != null ? depth0.mod_name : depth0), depth0))
    + " <i class=\"fas fa-times\"></i>\r\n                </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"shift-entry-modal__wrapper\">\r\n    <input id=\"shift-entry__shift-id\" type=\"hidden\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\r\n    <input id=\"shift-entry__shift-updated\" type=\"hidden\" value=\"false\">\r\n    <h5>"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "-"
    + alias2(alias1((depth0 != null ? depth0.d_or_n : depth0), depth0))
    + "</h5>\r\n    <ul class=\"shift-entry__details-list\">\r\n        <li class=\"shift-entry__details-list-item\">\r\n            <span class=\"shift-entry__detail\">\r\n                <span class=\"role-title\">Role: </span>\r\n                <span class=\"role-name\">"
    + alias2((helpers.stringToProperCase || (depth0 && depth0.stringToProperCase) || helpers.helperMissing).call(alias3,(depth0 != null ? depth0.role_name : depth0),{"name":"stringToProperCase","hash":{},"data":data}))
    + "</span>\r\n                <a class=\"shift-entry__show-item-edit btn-secondary\" data-show=\"role\" href=\"javascript:void(0);\">\r\n                    <i class=\"fas fa-pencil-alt\"></i>\r\n                </a>\r\n            </span>\r\n            <div class=\"hidden\" data-show-target=\"role\">\r\n                <!-- Hidden input to edit role -->\r\n                <form id=\"role-edit\" class=\"shift-entry__form shift-item-edit\">\r\n                    <select class=\"shift-entry__select shift-entry__role-select\" required>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\r\n                    \r\n                    <button class=\"shift-entry__cancel-item-edit shift-entry__btn btn-danger\" data-hide=\"role\">\r\n                        <i class=\"fas fa-times\"></i>\r\n                    </button>\r\n                    <button class=\"shift-entry__submit-item-edit shift-entry__btn btn-success\">\r\n                        <i class=\"fas fa-check\"></i>\r\n                    </button>\r\n                </form>\r\n            </div>\r\n        </li>\r\n\r\n        <li class=\"shift-entry__details-list-item\">\r\n            <span class=\"shift-entry__detail\">\r\n                <span class=\"assignment-title\">Assignment: </span>\r\n                <span class=\"assignment-name\">"
    + alias2(alias1((depth0 != null ? depth0.assignment_name : depth0), depth0))
    + "</span>\r\n                <a class=\"shift-entry__show-item-edit btn-secondary\" data-show=\"assignment\" href=\"javascript:void(0);\">\r\n                    <i class=\"fas fa-pencil-alt\"></i>\r\n                </a>\r\n            </span>\r\n            <div class=\"hidden\" data-show-target=\"assignment\">\r\n                <!-- Hidden input to edit role -->\r\n                <form id=\"assignment-edit\" class=\"shift-entry__form shift-entry__item-edit\">\r\n                    <select class=\"shift-entry__select shift-entry__role-select\" required>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.assignments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\r\n\r\n                    <button class=\"shift-entry__cancel-item-edit shift-entry__btn btn-danger\" data-hide=\"assignment\">\r\n                        <i class=\"fas fa-times\"></i>\r\n                    </button>\r\n                    <button class=\"shift-entry__submit-item-edit shift-entry__btn btn-success\">\r\n                        <i class=\"fas fa-check\"></i>\r\n                    </button>\r\n                </form>\r\n            </div>\r\n        </li>\r\n\r\n        <li class=\"shift-entry__details-list-item shift-entry__mods\">\r\n            <ul class=\"shift-entry__mod-list\">\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.shift_mods : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n            <div>\r\n                <form id=\"mod-edit\" class=\"shift-entry__form shift-entry___mod-add\">\r\n                    <select class=\"shift-entry__select shift-entry__mods\" id=\"shift-add-mod\">\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mods : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\r\n                    <button type=\"submit\" class=\"shift-entry__btn btn-primary\">\r\n                        <i class=\"fas fa-plus\"></i>\r\n                    </button>\r\n                </form>\r\n            </div>\r\n        </li>\r\n    </ul>\r\n</div>\r\n";
},"useData":true}));
this["ShiftTracker"]["templates"]["staff"]["shiftFormError"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr class=\"shift-edit-row\">\r\n    <td colspan=\"4\">\r\n        <div class=\"shift-edit-container hidden\">\r\n            <h2>Error</h2>\r\n            <p>There was an error displaying this shift's information.</p>\r\n        </div>\r\n    </td>\r\n</tr>";
},"useData":true});
Handlebars.registerPartial("shift_entry_modal_footer", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button class='shift-entry__delete btn btn-danger'>Delete</button>";
},"useData":true}));
this["ShiftTracker"]["templates"]["test"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"which",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("staff_detail_statistics", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.assignmentStats : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.categoryStats : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.roleStats : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.modStats : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    <div class=\"rounded-outline staff__role-stats\">\r\n        <h5>Day/Night Statistics</h5>\r\n        <div class=\"stat__item\" data-stat-count=\""
    + alias4(((helper = (helper = helpers.dayCount || (depth0 != null ? depth0.dayCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dayCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-total=\""
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-percent=\""
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.dayCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + "\">\r\n            <p>Number of Day Shifts: "
    + alias4(((helper = (helper = helpers.dayCount || (depth0 != null ? depth0.dayCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dayCount","hash":{},"data":data}) : helper)))
    + " / "
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + " ("
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.dayCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\r\n        </div>\r\n        <div class=\"stat__item\" data-stat-count=\""
    + alias4(((helper = (helper = helpers.nightCount || (depth0 != null ? depth0.nightCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nightCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-total=\""
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + "\" data-stat-percent=\""
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.nightCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + "\">\r\n            <p>Number of Day Shifts: "
    + alias4(((helper = (helper = helpers.nightCount || (depth0 != null ? depth0.nightCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nightCount","hash":{},"data":data}) : helper)))
    + " / "
    + alias4(((helper = (helper = helpers.shiftCount || (depth0 != null ? depth0.shiftCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shiftCount","hash":{},"data":data}) : helper)))
    + " ("
    + alias4((helpers.printPercent || (depth0 && depth0.printPercent) || alias2).call(alias1,(depth0 != null ? depth0.nightCount : depth0),(depth0 != null ? depth0.shiftCount : depth0),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\r\n        </div>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__assignment-stats\">\r\n        <h5>Assignment Statistics</h5>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.assignmentStats : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <div class=\"stat__item\" data-stat-count=\""
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\" data-stat-total=\""
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + "\" data-stat-percent=\""
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + "\">\r\n            <p>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + ": "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + " / "
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + " ("
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\r\n        </div>\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__category-stats\">\r\n        <h5>Category Statistics</h5>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.categoryStats : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <div class=\"stat__item\" data-stat-count=\""
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\" data-stat-total=\""
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + "\" data-stat-percent=\""
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + "\" data-hi=\"a\">\r\n            <p>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + ": "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + " / "
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + " ("
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\r\n        </div>\r\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__role-stats\">\r\n        <h5>Role Statistics</h5>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.roleStats : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <div class=\"stat__item\" data-stat-count=\""
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + "\" data-stat-total=\""
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + "\" data-stat-percent=\""
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + "\">\r\n            <p>"
    + alias2((helpers.stringToProperCase || (depth0 && depth0.stringToProperCase) || alias4).call(alias3,(depth0 != null ? depth0.name : depth0),{"name":"stringToProperCase","hash":{},"data":data}))
    + ": "
    + alias2(alias1((depth0 != null ? depth0.count : depth0), depth0))
    + " / "
    + alias2(alias1((depths[1] != null ? depths[1].shiftCount : depths[1]), depth0))
    + " ("
    + alias2((helpers.printPercent || (depth0 && depth0.printPercent) || alias4).call(alias3,(depth0 != null ? depth0.count : depth0),(depths[1] != null ? depths[1].shiftCount : depths[1]),{"name":"printPercent","hash":{},"data":data}))
    + ")</p>\r\n        </div>\r\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <div class=\"rounded-outline staff__role-stats\">\r\n        <h5>Shift Statistics</h5>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.modStats : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"rounded-outline\">No statistics to display.  No shifts entered for this user.</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.ifgtZero || (depth0 && depth0.ifgtZero) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shiftCount : depth0),{"name":"ifgtZero","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true}));