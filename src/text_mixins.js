const _ = require('lodash/core');

module.exports = {
  capitalize: function(input) {
    if (_.isString(input)) {
      let matcher = match => match.toUpperCase();
      return this.removeUnderscore(input).replace(/^./, matcher);
    }
    return '';
  },

  createId: function(...args) {
    return args
      .join('-')
      .toLowerCase()
      .replace(/\s/g, '-');
  },

  removeUnderscore: function(input) {
    if (_.isString(input)) {
      return input.replace(/_|-/g, ' ');
    }

    return '';
  },
};
