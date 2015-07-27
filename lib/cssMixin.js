"use strict";

var _ = require("lodash");
var cx = require("classnames");

module.exports = {
  checkCss: function checkCss(css, k) {
    if (_.has(css, k)) {
      return css[k];
    }

    return css["default"];
  },

  getClasses: function getClasses(css) {
    return cx(css);
  },

  toggleCss: function toggleCss(arr) {
    return _.map(arr, function (value) {
      if (_.isObject(value)) {
        value = _.transform(value, function (r, v, k) {
          return r[k] = !v;
        });
      }

      return value;
    });
  }
};
//# sourceMappingURL=cssMixin.js.map