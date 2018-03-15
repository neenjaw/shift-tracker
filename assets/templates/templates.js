Handlebars.registerPartial("test", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "seeya later";
},"useData":true}));
this["ShiftTracker"] = this["ShiftTracker"] || {};
this["ShiftTracker"]["templates"] = this["ShiftTracker"]["templates"] || {};
this["ShiftTracker"]["templates"]["loader"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"main-loader\">\r\n    <span class=\"main-spinner\"><i class=\"fas fa-spinner fa-pulse\"></i></span>\r\n</div>";
},"useData":true});
this["ShiftTracker"]["templates"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
Handlebars.registerPartial("shift_entry_modal_content", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "hi there";
},"useData":true}));
this["ShiftTracker"]["templates"]["shift_table"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
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
this["ShiftTracker"]["templates"]["test"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"which",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});