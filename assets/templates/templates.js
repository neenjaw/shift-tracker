this["ShiftTracker"] = this["ShiftTracker"] || {};
this["ShiftTracker"]["templates"] = this["ShiftTracker"]["templates"] || {};
this["ShiftTracker"]["templates"]["test"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div>\r\n        "
    + container.escapeExpression(((helper = (helper = helpers.bar || (depth0 != null ? depth0.bar : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"bar","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.foo : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});