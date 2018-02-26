import _ from 'lodash/core';

const removeUnderscore = input => {
  if (_.isString(input)) {
    return input.replace(/_|-/g, ' ');
  }

  return '';
};

export default {
  capitalize: function(input) {
    if (_.isString(input)) {
      let matcher = match => match.toUpperCase();
      return removeUnderscore(input).replace(/^./, matcher);
    }
    return '';
  },

  createId: function(...args) {
    return args
      .join('-')
      .toLowerCase()
      .replace(/\s/g, '-');
  },

  removeUnderscore,
};
