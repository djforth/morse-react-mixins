'use strict';

var _ = require('lodash/core'),
    transform = require('lodash/transform'),
    cx = require('classnames');

module.exports = {
  checkCss: function checkCss(css, k) {
    if (_.has(css, k)) {
      return css[k];
    }

    return css.default;
  },

  getClasses: function getClasses(css) {
    return cx(css);
  },

  setValue: function setValue(arr, key, val) {
    return _.map(arr, function (value) {
      if (_.isObject(value) && _.has(value, key)) {
        value[key] = val;
      }

      return value;
    });
  },

  toggleCss: function toggleCss(arr) {
    return _.map(arr, function (value) {
      if (_.isObject(value)) {
        value = transform(value, function (r, v, k) {
          r[k] = !v;
        });
      }

      return value;
    });
  }
};