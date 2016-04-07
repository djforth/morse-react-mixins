'use strict';

// Libraries
var React = require('react'),
    ReactDOM = require('react-dom'),
    _ = require('lodash/core'),
    includes = require('lodash/includes');

var attrs = ['padding-left', 'padding-right', 'margin-left', 'margin-right', 'border-left-width', 'border-right-width', 'width'];

var elements = [],
    elm_sizes = [];

function getValue(v) {
  return Number(v.replace(/[a-z]|%/g, ''));
}

function getTrueWidth(e) {
  var elm = window.getComputedStyle(e, null),
      n = 0;
  _.forEach(attrs, function (attr) {
    var v = getValue(elm.getPropertyValue(attr));
    n += v;
  });

  addElement(e, n);

  return n;
}

function addElement(elm, w) {
  if (includes(_.map(elm_sizes, function (e) {
    return e.elm;
  }), elm)) {
    elm_sizes = _.map(elm_sizes, function (e) {
      if (e.elm.isEqualNode(elm)) e.width = w;
      return e;
    });
  } else {
    elm_sizes.push({ elm: elm, width: w });
  }
}

module.exports = {
  getTrueWidth: getTrueWidth,

  convertRefs: function convertRefs(refs) {
    elements = _.values(refs);
    return undefined;
  },

  convertDomlist: function convertDomlist(list) {
    elements = Array.prototype.slice.call(list);
    return this;
  },

  convertReactComps: function convertReactComps(refs) {
    elements = _.map(_.values(refs), function (r) {
      if (_.isElement(r)) return r;
      return ReactDOM.findDOMNode(r);
    });
  },

  getAllWidths: function getAllWidths() {
    return elm_sizes;
  },

  getWidths: function getWidths(list) {
    var items = void 0,
        width = void 0;
    items = _.isArray(list) ? list : elements;
    if (items.length === 0) return 0;

    width = _.reduce(items, function (p, c) {
      var n = _.isNumber(p) ? p : getTrueWidth(p);
      n += getTrueWidth(c);
      return n;
    }, 0);

    return width;
  }
};