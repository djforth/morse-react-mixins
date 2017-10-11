// Libraries
// import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import includes from 'lodash/includes';

let attrs = [
  'padding-left',
  'padding-right',
  'margin-left',
  'margin-right',
  'border-left-width',
  'border-right-width',
  'width',
];

let elements = [];
let elmSizes = [];

function getValue(v) {
  return Number(v.replace(/[a-z]|%/g, ''));
}

function getTrueWidth(e) {
  let elm = window.getComputedStyle(e, null);
  let n = 0;
  _.forEach(attrs, attr => {
    let v = getValue(elm.getPropertyValue(attr));
    n += v;
  });

  addElement(e, n);

  return n;
}

function addElement(elm, w) {
  if (includes(_.map(elmSizes, e => e.elm), elm)) {
    elmSizes = _.map(elmSizes, e => {
      if (e.elm.isEqualNode(elm)) e.width = w;
      return e;
    });
  } else {
    elmSizes.push({ elm: elm, width: w });
  }
}
/* eslint-disable no-invalid-this */
export default {
  getTrueWidth: getTrueWidth,

  convertRefs: refs => {
    elements = _.values(refs);
    return this;
  },

  convertDomlist: function(list) {
    elements = Array.prototype.slice.call(list);
    return this;
  },

  convertReactComps: function(refs) {
    elements = _.map(_.values(refs), r => {
      if (_.isElement(r)) return r;
      return ReactDOM.findDOMNode(r);
    });
  },

  getAllWidths: function() {
    return elmSizes;
  },

  getWidths: function(list) {
    let items;
    let width;
    items = _.isArray(list) ? list : elements;
    if (items.length === 0) return 0;

    width = _.reduce(
      items,
      function(p, c) {
        let n = _.isNumber(p) ? p : getTrueWidth(p);
        n += getTrueWidth(c);
        return n;
      },
      0
    );

    return width;
  },
};
/* eslint-enable no-invalid-this */
