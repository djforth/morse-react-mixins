import _ from 'lodash/core';
// import React from 'react';
import ReactDOM from 'react-dom';

module.exports = {
  checkArray: (array, greaterThan = 0) => array && _.isArray(array) && array.length > greaterThan,

  checkOject: (obj, keys = []) => {
    let check = _.isObject(obj);
    if (!check || _.isEmpty(keys)) return check;

    return _.reduce(
      keys,
      (prev, curr) => {
        if (prev) return prev;
        return _.has(obj, curr);
      },
      false
    );
  },

  isMounted: component => {
    try {
      ReactDOM.findDOMNode(component);
      return true;
    } catch (e) {
      // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
      return false;
    }
  },
};
