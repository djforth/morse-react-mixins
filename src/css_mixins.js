import _ from 'lodash';
import transform from 'lodash/transform';
import cx from 'classnames';

export default {
  checkCss: function(css, k) {
    if (_.has(css, k)) {
      return css[k];
    }

    return css.default;
  },

  getClasses: function(css) {
    return cx(css);
  },

  setValue: function(arr, key, val) {
    return arr.map(value => {
      if (_.isObject(value) && _.has(value, key)) {
        value[key] = val;
      }

      return value;
    });
  },

  toggleCss: function(arr) {
    return arr.map(value => {
      if (_.isObject(value)) {
        return transform(value, (r, v, k) => {
          r[k] = !v;
        });
      }

      return value;
    });
  },
};
