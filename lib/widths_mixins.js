"use strict";

var _ = require("lodash");

var attrs = ["padding-left", "padding-right", "margin-left", "margin-right", "border-left-width", "border-right-width", "width"];

var elements = [];
var elm_sizes = [];

var getValue = function getValue(v) {
  // console.log(v)
  return Number(v.replace(/[a-z]|%/g, ""));
};

var getTrueWidth = function getTrueWidth(e) {
  var elm = window.getComputedStyle(e, null);
  var n = 0;
  _.forEach(attrs, function (attr) {
    var v = getValue(elm.getPropertyValue(attr));
    n += v;
  });
  elm_sizes.push({ elm: e, width: n });
  return n;
};

module.exports = {
  getTrueWidth: getTrueWidth,

  convertRefs: function convertRefs(refs) {
    elements = _.values(refs);
    return undefined;
  },

  convertDomlist: function convertDomlist() {
    elements = Array.prototype.slice.call(list);
    return undefined;
  },

  getAllWidths: function getAllWidths() {
    if (elm_sizes.length === 0 && elements.length > 0) {
      undefined.getWidths();
    }

    return elm_sizes;
  },

  getWidths: function getWidths(list) {
    var items = _.isArray(list) ? list : elements;
    // console.log(list.length, list)
    var width = _.reduce(items, function (p, c) {
      var n = _.isNumber(p) ? p : getTrueWidth(p);
      n += getTrueWidth(c);
      return n;
    });

    return width;
  }
};
//# sourceMappingURL=widths_mixins.js.map